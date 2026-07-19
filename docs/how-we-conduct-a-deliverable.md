# Como conduzimos um entregável (o método)

A disciplina de gates que usávamos num OPS de chat solto, agora formalizada
em git — mesma ideia do `superpowers:brainstorming` pra software: **nunca
produzir o entregável final sem entendimento validado.**

| Etapa | Equivalente no método Git |
|---|---|
| Entrevista + Diagnóstico | `superpowers:brainstorming` — perguntas uma a uma, sem gerar entregável |
| Arquitetura | Apresentação do design em seções, aprovação |
| Gate antes de Produção | O gate que já existe no `brainstorming` — nada de doc final sem aprovação explícita |
| Produção | Spec + entregável final em Markdown, commitado |
| Captura Semanal (contínua; capturar ≠ atualizar) | Comentários acumulando numa Issue "semana N" |
| Consolidação Semanal ("agora pode rodar a atualização") | Fechar a issue da semana com um resumo — só quando pedido explicitamente |

## Onde cada entregável mora

- **Master Briefing** (contexto-mestre, governança) → `docs/PROJECT.md`
  preenchido, ou um documento dedicado em `docs/` se o projeto crescer.
- **Portfólio** → o Project board nativo (ver `docs/PROJECT.md`).
- **Memória Discursiva** (narrativa, relacional, sensível) →
  `docs/memoria-discursiva.md`.
- **Weekly Report** → preencha
  [`templates/weekly-report-template.md`](../templates/weekly-report-template.md)
  a cada consolidação.

## Exportar para Word (quando precisar entregar formalmente a um cliente)

```bash
node scripts/export-docx.js docs/PROJECT.md
```

Gera um `.docx` no padrão visual Sogest a partir do Markdown — a fonte de
verdade continua sendo o Markdown, nunca o `.docx` editado à parte.
