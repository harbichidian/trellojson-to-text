# Trello JSON to Text
Turns your Trello JSON into text. Run with `node trellojson-to-text.js <yourJSONfile.json>` and it will spit out something like this:

```
To-do:
- Review new Forms documentation
  (Have to wait until it's available on the intranet)
- Annual Information Management review

In progress:
- Get new deployment ready
  [x] Foundation site
  [x] Global common
  [x] DocumentUtils
  [ ] AutoMap
  [ ] Solution

Completed:
- Conduct interview results presentation
- Write Trello JSON formatter
```

Formatted as below, in case you couldn't tell.

```
ListName:
- CardName
  (LatestCardComment)
  [x] CompleteCheckItem
  [ ] IncompleteCheckItem
```
