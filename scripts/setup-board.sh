#!/usr/bin/env bash
# Cria o Project board do projeto e carrega toda issue aberta nele.
#
# PRE-REQUISITO (uma vez, dono da conta):
#   gh auth refresh -s project,read:project
#
# Uso:  OWNER=pmsartori REPO=pmsartori/[SLUG_PROJETO] TITLE="[PROJETO] Roadmap" scripts/setup-board.sh
set -euo pipefail

: "${OWNER:?defina OWNER}"
: "${REPO:?defina REPO}"
: "${TITLE:?defina TITLE}"

echo "==> criando board '$TITLE'"
NUM=$(gh project create --owner "$OWNER" --title "$TITLE" --format json -q '.number')
echo "    board #$NUM"

STATUS_FIELD=$(gh project field-list "$NUM" --owner "$OWNER" --format json \
  -q '.fields[] | select(.name=="Status") | .id')

echo "==> configurando colunas do Status"
gh api graphql -f query='
  mutation($field:ID!) {
    updateProjectV2Field(input:{
      fieldId:$field,
      singleSelectOptions:[
        {name:"Triage",      color:YELLOW, description:"Aguardando aceite/recusa"},
        {name:"Backlog",     color:GRAY,   description:"Aceito, não iniciado"},
        {name:"Ready",       color:BLUE,   description:"Definido, pronto pra pegar"},
        {name:"In Progress", color:PURPLE, description:"Alguém está fazendo"},
        {name:"In Review",   color:ORANGE, description:"PR aberto"},
        {name:"Done",        color:GREEN,  description:"Mergeado / entregue"}
      ]
    }){ projectV2Field { ... on ProjectV2SingleSelectField { id } } }
  }' -f field="$STATUS_FIELD" >/dev/null
echo "    colunas: Triage / Backlog / Ready / In Progress / In Review / Done"

echo "==> adicionando issues abertas"
gh issue list --repo "$REPO" --state open --limit 200 --json url -q '.[].url' \
  | while read -r url; do gh project item-add "$NUM" --owner "$OWNER" --url "$url" >/dev/null && echo "    + $url"; done

echo
echo "Pronto. Board: https://github.com/users/$OWNER/projects/$NUM"
