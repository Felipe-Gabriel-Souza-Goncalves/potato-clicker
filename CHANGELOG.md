# Atualizações - Versão atual - [3.1.0]

## Versão 3.1.0 - 30/04/2026
- JSON dos dados dos upgrades, powerups, skins e conquistas

## Versão 3.1.0-beta 27/04/2026
- 9 novas skins para a batata (desbloqueado por número de conquista)
- Novo powerup
- Alteração no cálculo de batatas por segundo (decorativo) e poder do clique (correção)

## Versão 3.0.4 - 25/04/2026
- Medida básica de backup em caso de save imcompatível
- Correções de erros envolvendo carregar save
- Correções de powerups e upgrades funcionando incorretamente
- Alteração de tempo de funções de atualização de DOM
- Alterações de design

## Versão 3.0.3 - 24/04/2026
- Ajustes de preços/efeito de powerups
- 2 novos powerups
- Correção na conquista de comprar todos os powerups
- Correção na visualização de preços com .0
- Pequena alteração nas informações dos upgrades

## Versão 3.0.2 - 07/04/2026
- Correção de comprar powerup somente se batatas for maior e não maior/igual ao preço
- Alguns comentários de código
- Setter de quantidade para os upgrades
- Remoção de código desnecessário
- Correção de efeito visual em powerups indisponíveis por preços
- Outras correções e alterações mínimas

## Versão 3.0.1 - 07/04/2026
- Agora clicar para comprar upgrade não obriga ser na imagem
- Mudança de código para mais coerência 
  - cps -> bpi (Batata por intervalo)
  - cpc -> bpc (Batata por clique)
- Correção de preços de powerups desatualizados
- Design dos powerups para comprar alterados
- Suspensão de 1 powerup para correção "no futuro fará sentido"
- Informações do upgrade ao passar mouse por cima
- Correção de lógica para validar conquistas aleatórias

## Versão 3.0 - 30/03/2026
**Desenvolvimento desde a 2.2.1** 
- Lançamento dos novos upgrades (incompátiveis com os anteriores)
- Estruturação de exportação e importação de arquivo de jogo (em progresso para compatibilidade com save antigo)
- Atualização de README

## Versão 2.2.x - 30/03/2026
**Commit temporário**
- Exportar arquivo
- 2ª fonte alterada se não houver conexão

## Versão 2.2.3 - 15/03/2026
- 20 novas conquistas 
- 6 novos powerups
- Mudança de nomes de algumas conquistas
- Mudança da ordem/preço dos powerups
- Problema de scroll na seção à esquerda

## Versão 2.2.2 - 15/03/2026
- Correções para alteração visual para batatas suficientes para compra de upgrades/powerups
- Alterações de design: Responsividade, hover, estilizações das imagens dos itens de upgrade

## Versão 2.2.1 - 13/03/2026
**ALGUNS BUGS PODEM EXISTIR ENVOLVENDO CONQUISTAS/UPGRADES**
- FINALMENTE componentes
  - Configurações
  - Conquistas
  - Estatísticas
  - Upgrades
- Tabela de upgrades agora é flexbox
- Novos ícones/nomes de upgrades
- Novos sprites para batata (inutilizados)

## Versão 2.2.0-beta - 11/03/2026
- Correção ao carregar powerups do localstorage
- Reestruturação dos upgrades (preços, produção)
- Novo upgrade
- Protótipos para carregar informações na primeira vez de conquistas/powerups/upgrades via informações salvas em json
- Novas artes da batata (por enquanto inutilizadas)


## Versão 2.1.0 - 05/03/2026
- Estatística de tempo de jogo (em foco)
- 2 Powerups novos
- Link de retorno para repositório
- Cada upgrade soma as batatas em seu próprio intervalo **(padrão 1s, futuramente haverá mais powerups ou outros que mudam esse tempo)**
- Mudanças pequenas de CSS para melhor consistência visual e responsividade
- Salvar corretamente powerups

## Versão 2.0.7 - 03/03/2026
- Correções de código
- Projetos para novas funcionalidades nos upgrades
- Correção da imagem da batata estar descentralizada
- Título da página mostra se o jogo está pausado

## Versão 2.0.6 - 03/03/2026
- Intervalos por requestAnimationFrame
- Correções de CSS das conquistas

## Versão 2.0.5 - 02/03/2026
- Correções de responsividade para conquistas e tabela de upgrades
- Botão de desativar volume agora é checkbox
- Protótipos inacabados para futuras atualizações envolvendo requestAnimationFrame

## Versão 2.0.4 - 27/01/2026
- Melhor responsividade das abas configurações/estatísticas/conquistas
- Pequenas alterações visuais no tamanho dos preços e imagem do cursor nos powerups

## Versão 2.0.3 - 29/01/2026
- Correções de imagens não sendo carregadas
- README atualizado ao projeto

## Versão 2.0.2 - 29/01/2026
- Lançamento do potato clicker
- Otimizações de código
- Alteração nos ícones de salvar
- Alteração na documentação do projeto 

## Versão 2.0.1 - 14/01/2026
- Correção do poder do clique não ser salvo em localStorage
- Informações dos powerups
- Correção de debug mal formado para trocar fundo

## Versão 2.0-beta - 13/01/2026
### Batata clicker!
- Imagens e nomes alterados
- Fundo apropriado para a região de clicar
- Fundo muda com horário do dispositivo

## **Antes do Potato Clicker**

## Versão 1.10-beta - 10/01/2026
- Primeira implementação dos powerups
- Otimizações e organização de código
- Melhorias e alterações de design

## Versão 1.9.2 - 26/12/2025
- Alteração de visual das seções de navegação
- Correções de conquistas não desbloqueadas
- Correções de visual dos preços de multiplicadores 10x ou 100x
- Leves alterações de código
- Progresso em nova funcionalidade de powerups
- Mudança de posição da tabela de upgrades

## Versão 1.9.1 - 22/12/2025
- Correções de bugs:
  - Conquistas recém desbloqueadas não aparecem descrição
  - Bloco de descrição de conquistas ter leiaute inconsistente
  - Não mudar visualmente se tiver cookies suficientes ou não
- Otimizações de código
- Fechar popup de conquista desbloqueada

## Versão 1.9 - 17/12/2025
- 5 novas conquistas
- Popup de conquistas quando liberada
- Caixa de descrição de conquistas liberadas
- Consertado erro recarregar todas conquistas salvas ao reiniciar página

## Versão 1.8 - 10/12/2025
- Novas 12 conquistas
- Novos textos informativos nas configurações
- Correção de ver a produção de cookies/seg em cada upgrade
- Reformulação do sistema de salvar
- Otimizações de código

## Versão 1.7 - 09/12/2025
- Volume vai de 0% a 100%
- Novo sistema de conquistas com 3 níveis
  - 17 conquistas para liberar
- Otimização de código

## Versão 1.6 - 09/12/2025
- Ícone de salvar
- Salvar manualmente
- Alterações dos upgrades
- Alteração para geração dinâmica dos produtos
- Alteração para salvamento dinâmico das informações 
  - **HÁ BUGS**
- Alterações visuais de ponteiro

## Versão 1.5 - 23/10/2024:
Um pouco de:
  - Responsividade
  - Animações
- Melhora do LocalStorage
- Estatísticas/Configurações em progresso

    
## Versão 1.4 - 25/10/2024:
- Novas 6 opções nas estatísticas
  - Cookies atuais
  - Cookies total
  - Cookies por clique
  - Cookies por segundo
  - Cliques
  - Melhorias compradas
      

## Versão 1.3 - 01/11/2024:
**AUTO CLIQUE TEMPORÁRIO (qualquer tecla)**

- Documentação do código (js)
- Mudança do código para orientação a objetos
- Alternar entre comprar 1 ou o máximo de upgrades
- Mudanças técnicas de código para:
  - localStorage
  - cookiesPS  (cookies por segundo)
  - poderClique (cookies por clique)

## Versão 1.2 - 18/11/2024:
- Opção de escolher quantos upgrades comprar
- Mudança da imagem do cookie
- Opção de reiniciar progresso + uso de SweetAlert2


## Versão 1.1 - 20/11/2024:
- Novos áudios para clicar no cookie
- Novo leiaute para a tabela de compras
- Opções de volume nas configurações