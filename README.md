# sample-ts-client

Dette er eit døme på ein enkel klient som hentar data frå Ordbok-APIet.

## Køyring

For å køyra klienten, må du ha [Node.js](nodejs) installert. Me anbefaler å bruka [Volta][volta] for å installera Node.js — men arkivet er òg konfigurert for å bruka [nvm][nvm].

Me bruker [Yarn][yarn] som pakkehåndterar, så du må ha det installert òg (med Volta treng du ikkje å installera Yarn manuelt).

```sh
yarn            # Installerer avhengnader
yarn start:dev  # Byggjer og køyrer klienten
```

## Codegen

Klienten bruker [GraphQL Code Generator][codegen] for å generera TypeScript-typar frå GraphQL-skjemaet. Dette gjer at me kan bruka TypeScript-typar for data frå API-et, og få hjelp frå redaktøren når me skriv koden.

Du kan sjå korleis me har konfigurert dette i [codegen.ts](codegen.ts) og [package.json](package.json).

## Lisens

Dette verket er lisensiert under [ISC-lisensen](LICENCE).

[nodejs]: https://nodejs.org/
[volta]: https://volta.sh/
[nvm]: https://github.com/nvm-sh/nvm
[yarn]: https://yarnpkg.com/
[codegen]: https://the-guild.dev/graphql/codegen
