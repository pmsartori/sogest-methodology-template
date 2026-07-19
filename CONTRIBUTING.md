# Contribuindo & Fluxo de trabalho

Como trabalhamos em [PROJETO].

## Acesso

- **Código/conteúdo:** GitHub `pmsartori/[SLUG_PROJETO]` (privado). Peça
  convite de colaborador.
- Este repositório é **privado por padrão** — pode conter informação
  sensível de cliente ou de governança interna.

## Branching & pull requests

Sem pipeline de deploy neste tipo de projeto — fluxo simples:

```
main            sempre a versão vigente; protegida (PR + 1 review)
feature/<nome>  sua branch de trabalho, a partir de main
```

1. `git switch -c feature/descricao-curta`
2. Siga o método antes de produzir qualquer entregável final — ver
   [`docs/how-we-conduct-a-deliverable.md`](docs/how-we-conduct-a-deliverable.md).
3. Abra PR contra `main`. 1 revisor aprova.
4. Squash-merge.

## Rastreamento de trabalho

- Trabalho é rastreado como **GitHub Issues**, organizado no **Project
  board** (Triage → Backlog → Ready → In Progress → In Review → Done).
- Pegue uma issue, self-assign, mova pra *In Progress*, referencie no PR
  (`Closes #NN`).

### Reivindicando trabalho

1. `gh issue edit <n> --add-assignee @me`
2. `gh issue edit <n> --add-label status:in-progress`
3. `gh pr create --draft --fill --base main`
