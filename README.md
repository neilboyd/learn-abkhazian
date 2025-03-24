# Learn Abkhazian

This site is a tutorial to learn Abkhazian language.

The site is built using
[Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy/tree/v7.2.4)
theme for
[Jekyll](https://jekyllrb.com/).

Contributions are welcome.
The preferred method is with a
[GitHub Pull Request](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).
At the bottom of every page is a link to edit the page.
But if that's too technical, contributions in any form are welcome.

## TODO

Russian:
- [ ] lesson 16, 17, 18, review 6
- [ ] lesson 19, 20, 21, 22, review 7
- [ ] additional material

English:
- [ ] lesson 16, 17, 18, review 6
- [ ] lesson 19, 20, 21, 22, review 7
- [ ] additional material

Turkish:
- [ ] lesson 12, review 4
- [ ] lesson 13, 14, 15, review 5
- [ ] lesson 16, 17, 18, review 6
- [ ] lesson 19, 20, 21, 22, review 7
- [ ] additional material
- [ ] Abkhazian-Turkish dictionary
- [ ] Turkish-Abkhazian dictionary

## To run locally

Clone repo, and then clone submodules:
```bash
git submodule init
git submodule update
```
Then run with
```bash
bundle exec jekyll serve
```
There is also a
[`devcontainer.json`](.devcontainer/devcontainer.json)
file for development in
[Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers).

## Cypress integration tests

To run the
[Cypress App](https://docs.cypress.io/app/get-started/open-the-app)
:
```
npm run cy:open
```
NB: the app only works on the host machine - not on a VM or in a dev container.

To run the Cypress tests:
```
npm run cy:run
```
