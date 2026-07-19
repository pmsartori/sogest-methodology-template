# Como conduzimos o projeto (módulos · epics · sprints · board · gates)

Guia único de como o trabalho é organizado e rastreado em [PROJETO]. Humanos
e assistentes de IA devem ler isto para responder "qual o estado do
projeto?" e "como eu pego / sugiro / rastreio trabalho?".

## Ver a visão geral

- **Peça ao seu assistente:** *"me dá a visão geral do projeto"* → ele roda
  [`scripts/overview.sh`](../scripts/overview.sh).
- **Web:**
  - **Board (visual):** https://github.com/users/pmsartori/projects/N
  - **Sprints (milestones):** https://github.com/pmsartori/[SLUG_PROJETO]/milestones
  - **Todas as issues:** https://github.com/pmsartori/[SLUG_PROJETO]/issues

## A estrutura

Quatro níveis, do mais amplo ao mais granular: **Módulo → Epic → Task →
Sub-task** — mesma lógica de um projeto de software, só que aqui um
"módulo" é uma frente de trabalho de condução (ex.: Master Briefing,
Portfólio, Weekly Update) em vez de uma área de código.

Módulos deste projeto e seu epic — **um epic por módulo, sempre**:

[TABELA_MODULOS_EPICS]

| Conceito | Primitivo do GitHub | Como usar |
|---|---|---|
| **Módulo** | label `area:` | Toda issue recebe uma. |
| **Epic** | issue com label `epic` + sub-issues | Filhos formam a barra de progresso. |
| **Task** | sub-issue de um epic | A unidade normal de trabalho. |
| **Sub-task** | sub-issue de uma task | Só quando a task precisa de checklist próprio. |
| **Sprint** | Milestone com data | Ex.: "Sprint 1". |
| **Status/dono** | Project board + assignee | Triage → Backlog → Ready → In Progress → In Review → Done. |
| **Gate** | campo customizado do board | A etapa da jornada (ex.: Diagnóstico, Arquitetura, Produção) — ver `how-we-conduct-a-deliverable.md`. |

O Portfólio (visão executiva de todos os entregáveis, com Gate/Pilar/
Cluster/Impacto) não vira planilha separada — é o próprio board do GitHub:
crie *views* salvas agrupadas por Gate (visão executiva), filtradas
(resumo), e a lista completa (base total). O histórico de mudanças é o
log de atividade nativo de cada issue.

## Comandos do dia a dia

```bash
scripts/overview.sh
gh issue list --milestone "Sprint 1"
gh issue list --assignee @me
gh issue list --label area:<modulo>
gh issue list --label needs-triage
```

## Os fluxos

**Pegar trabalho:** self-assign + label `status:in-progress` + PR rascunho
(`Closes #<n>`), mesma disciplina de um projeto de software.

**Sugerir uma frente nova:** issue nova → template 💡 Sugestão (cai em
Triage).
