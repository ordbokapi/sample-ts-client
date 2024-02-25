import { request, gql } from 'graphql-request';
import { Dictionary, WordClass } from './gql/graphql.js';
import { readLine, selectItem } from './cli-util.js';

const url = 'https://api.ordbokapi.org/graphql';
const document = gql`
  query ExampleQuery(
    $word: String!
    $dictionaries: [Dictionary!]
    $wordClass: WordClass
  ) {
    word(word: $word, dictionaries: $dictionaries, wordClass: $wordClass) {
      articles {
        id
        lemmas {
          lemma
        }
        wordClass
        definitions {
          content {
            textContent
          }
        }
      }
    }
  }
`;

// forhindrar at nodeåtvaringar frå asynkron kode forstyrrar visninga av
// brukarmeldingar
await new Promise((resolve) => setTimeout(resolve, 500));

console.log('Ordbok API demo-app');
console.log('====================');
console.log();

process.stdout.write('Tast inn eit ord: ');

// lesa ord frå kommandolinja
const word = await readLine();

console.log();

// velje ordbøker
console.log('Vel ei ordbok: ');
const dictionaries = await selectItem(Object.values(Dictionary), true);

console.log();

// velje ordklasse
console.log('Vel ei ordklasse: ');
const wordClass = await selectItem(Object.values(WordClass), true);

console.log();

// senda førespurnad til API
try {
  const data = await request(url, document, {
    word,
    dictionaries: dictionaries ? [dictionaries] : undefined,
    wordClass,
  });

  console.dir(data, { depth: null });
} catch (error) {
  console.error('Feil:', error);
}
