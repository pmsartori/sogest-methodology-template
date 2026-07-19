# [PROJETO] — regras do projeto (leia primeiro)

[DESCRICAO_UMA_LINHA]

Projeto do tipo **Metodologia e Gestão** — condução de projeto e
governança, sem software. Este arquivo é a memória de projeto que todo
assistente de IA deve ler antes de trabalhar aqui. Docs completos:
[`README.md`](README.md), [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Rastreamento do projeto

Trabalho é organizado em **módulos** (`area:` labels) → **epics** (issues +
sub-issues) → **sprints** (milestones), num **board**
(Triage→Backlog→Ready→In Progress→In Review→Done). Guia completo:
[`docs/PROJECT.md`](docs/PROJECT.md).

- **Visão geral do projeto:** rode [`scripts/overview.sh`](scripts/overview.sh).
- **Pegar um ticket:** self-assign + label `status:in-progress` + PR
  rascunho (`Closes #n`) antes de produzir qualquer entregável.

## Módulos deste projeto

[LISTA_MODULOS_COM_EPICS]

## Regras de ouro

1. **Nunca produza o entregável final sem entendimento validado.** Siga o
   método em [`docs/how-we-conduct-a-deliverable.md`](docs/how-we-conduct-a-deliverable.md)
   — entrevista/diagnóstico → arquitetura → gate de aprovação → produção.
2. **Capturar não é atualizar.** Durante a semana, registre fatos numa
   issue de captura; só consolide quando pedido explicitamente.
3. Consulte [`docs/decision-records/`](docs/decision-records/README.md)
   antes de mudar uma decisão já assentada — e adicione um registro novo
   quando tomar uma decisão que alguém possa questionar depois.
4. **Memória discursiva é interna.** Antes de compartilhar qualquer trecho
   de [`docs/memoria-discursiva.md`](docs/memoria-discursiva.md) com um
   cliente, separe o que é compartilhável do que não é.
5. Edite `main` só via PR — sem pipeline de deploy neste tipo de projeto,
   mas o mesmo cuidado de revisão se aplica.
