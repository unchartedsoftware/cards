# Cards

> A Javascript UI component for browsing documents

![Alt text](/img/cards-vertical.png?raw=true)

![Alt text](/img/cards-inline.png?raw=true)
## Usage
  ```
  <div id="cards-panel" ></div>

  import Cards from '@uncharted/cards';

  const cards = new Cards();
  cards.loadData([
    {
        id: 1,
        topBarColor: 'red',
        summary: 'summary-text',
        content: 'text-content'
    },
    {
        id: 2,
        topBarColor: 'blue',
        summary: 'summary-text',
        content: 'text-content'
    },
  ]);
  $('#cards-panel').html(cards.render());
  ```
## Development
    yarn install
    yarn run build

### Running an example
https://github.com/unchartedsoftware/cards/blob/master/example/index.html

    yarn start
