#!/usr/bin/env bash
# Visão geral do projeto: sprint atual, progresso por epic, trabalho por
# módulo, inbox de triagem. Uso: scripts/overview.sh ["Sprint N"]
set -euo pipefail

SPRINT="${1:-}"

echo "== Sprint =="
if [ -n "$SPRINT" ]; then
  gh issue list --milestone "$SPRINT" --json number,title,assignees,state \
    --template '{{range .}}#{{.number}} {{.title}} ({{range .assignees}}{{.login}} {{end}}){{"\n"}}{{end}}'
else
  gh api graphql -f query='query{ repository(owner:"pmsartori",name:"[SLUG_PROJETO]"){ milestones(first:1, states:OPEN, orderBy:{field:DUE_DATE,direction:ASC}){ nodes{ title dueOn } } } }' \
    --jq '.data.repository.milestones.nodes[0].title // "sem sprint aberta"'
fi

echo
echo "== Epics (progresso) =="
gh issue list --label epic --state all --json number,title,state \
  --template '{{range .}}#{{.number}} {{.title}} [{{.state}}]{{"\n"}}{{end}}'

echo
echo "== Trabalho por módulo =="
for label in $(gh label list --json name --jq '.[].name' | grep '^area:'); do
  count=$(gh issue list --label "$label" --state open --json number --jq 'length')
  echo "$label: $count aberta(s)"
done

echo
echo "== Inbox de triagem =="
gh issue list --label needs-triage --json number,title \
  --template '{{range .}}#{{.number}} {{.title}}{{"\n"}}{{end}}'
