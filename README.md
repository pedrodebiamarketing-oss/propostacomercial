# Modelo de Proposta Comercial

Uma proposta comercial em página web, pronta para você adaptar e mandar o link para o cliente.
Tem capa, portfólio, escopo, investimento com formas de pagamento, um programa de benefícios (opcional) e o botão para aprovar pelo WhatsApp.

## Como usar

1. Clique em **Use this template → Create a new repository** (ou baixe em **Code → Download ZIP**).
2. Abra o `index.html` e troque tudo que está **[entre colchetes]**. Os pontos principais estão marcados com `EDITE` nos comentários.
3. No WhatsApp, troque `55SEUNUMERO` pelo seu número com DDI e DDD (ex.: `5511999999999`). Ele aparece em mais de um lugar.
4. Troque o `logo.svg` pelo logo da sua marca (mesmo nome de arquivo).
5. Coloque as fotos dos seus clientes em `assets/clientes/` (`cliente-1.jpg`, `cliente-2.jpg`…). Sem foto, o card mostra só a inicial.
6. Ajuste escopo, prazo e valores. Confira se o valor bate nas seções **Investimento** e **Vamos começar?**.
7. Não tem programa de cashback? Apague a seção `id="clube"` inteira.
8. Publique (Vercel, Netlify, GitHub Pages…) e mande o link para o cliente.

A data de emissão é preenchida sozinha com a data do dia em que o cliente abre a página.

## Arquivos

| Arquivo | Para que serve |
| --- | --- |
| `index.html` | A proposta. É o único arquivo que você precisa editar. |
| `styles.css` / `proposta.css` | Visual da página. |
| `proposta-fx.js` | Data automática, animações de entrada e as linhas da capa. |
| `logo.svg` | Logo de exemplo, troque pelo seu. |
| `assets/clientes/` | Fotos do seu portfólio. |

## Checklist antes de enviar

- [ ] Nome do cliente na capa e no cartão do clube
- [ ] Escopo: o que entra (o que não está na lista não está incluso)
- [ ] Prazo de entrega
- [ ] Valor total, à vista e parcelado batendo em toda a página
- [ ] WhatsApp, e-mail e redes sociais no rodapé
- [ ] Nenhum `[colchete]` sobrando
