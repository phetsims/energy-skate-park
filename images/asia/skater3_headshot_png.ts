/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABHCAYAAAC6cjEhAAAACXBIWXMAAAsSAAALEgHS3X78AAAPFElEQVR4nGIYBVgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//9iHOQBowDFMHCBgYHhA81tZWBgAAAAAP//GkwBY8DAwODAwMBgDwoMUSF+A1YWFgYBPh64gtfvPjB8+/7zw9fvPw4wMDBsZGBgWEATlzAwMAAAAAD//xrogAEFRjwbK0uAiCC/gpSYMAM/Hw+DAC83Xk3fvv9guP3wGcOjZy8f/Pr9p5CBgWEDVV3FwMAAAAAA//+idcAIQD2PDvxBgSEpJgwODBAmB4AC6MyVWwyv332cwMDAAAog6gAGBgYAAAAA//+iRcCAyoR8BgaGAFEhfgV+Xh4GNlYWFAX8vNxkBwY2AAqch09fgrJVIlUMZGBgAAAAAP//ombAgFJHv6gQf4KKvDRVPU4MoGrgMDAwAAAAAP//YqaSuwzYWFn266gpOBhqqTLwcnNRyVjiASgivv34afDx81dQZIMKZ/IBAwMDAAAA//+iRsAIsLGynLc11ZOgdypBByD737z/6PDt+8+LDAwMN8g2iIGBAQAAAP//YqKCe/ZbGGgJEKpJkAGo0Hz49CUVrMYEJjpqoDJtPjRrkwcYGBgAAAAA//+iNMUUqMhLJyjJShKl+PefPwy37j9hePz0BYO1tjLDvtOXGf79/4/SVqEUsLKyMDAzMXG8fPOeg4GBYSdZ5jEwMAAAAAD//6Ko8GVjZbnvYWeqAGqIEQKv331kuH3/MUOEswVDYbgHWPmnr98Z+lduZ1h78AyDnoYyg6gQP9UCaPuh06CUqcjAwPCAZM0MDAwAAAAA//+iJMUkKMpKJhAqV0Cp5MqtBwwcTAwMcytSGdzNdeFy7GysDA6Gmgy+1oYM24+dY7j37DWDsAAvKMYpcBYEsLGwMDx79RaUnUAtZNIAAwMDAAAA//+iJGDqDbVVNTjY2XAqAJUlR89eYUj1sWdoSw9j4OPmxKoOJB7qaM7w588fhs2HzjDw8nIz4DOXGADKno+evVL4/efPTAYGhh8kaWZgYAAAAAD//yI7YLg4OVboqiH371DBh89fGc5evsWwvD4LJZXgA0ZqCgzWOqoMa/cdZ/j24xc1yh5QWXMT2vkkHjAwMAAAAAD//yI3zTrgy0KgQLlw9TbD0rpMBi1FaZIMBqlf1ZTLIMzFDm60UQKgbvQn2QwGBgYAAAAA//8iO2BwVc+UBAoMgLLW7IoUBhdDDYbj56+ByylyABcnB6hDGkBy1c3AwAAAAAD//yI3YPSx1SDUCBRkUJ8UxFAc7sFw6NQlsgNHRAgcJtg6srgBAwMDAAAA//8iN2AUQLGBDEAOp2agwECooxlDd3Ykw9EzV8ABTyqARiBonId4wMDAAAAAAP//IitgQINI6GKgJN+RGU7VQIEBdzNdcICDAp7UwIFmeX2SNDEwMAAAAAD//yInYDAadKDGm5GKHNgDtAKgACcncKApG3f1iQ0wMDAAAAAA//8iK2DQq9E7D58yFIZ7kmEUaQA5cEBtJGIBthSOFzAwMAAAAAD//6JGJ5KBnYWZJlkIG4AFDiW1FUHAwMAAAAAA//8iJ2AMuDjYUQQkhPho5kBsABQ4tQkBDGcuU9bOwQkYGBgAAAAA//8iJ2AE0GukgQCg2grUQwdlY0IANLxKUs3EwMAAAAAA//8i3C0mAEAFoYyoEF5VO09dZjhx5TbDtQeYnrDQVmVI9rHH2Y+CgeLJSxmevH7H8PHrdwZ+qFoQ+9r9p+C2Cr7xIPQxZ4KAgYEBAAAA//+iOGB+//7DICMrjlN+9f5T4EAJdTIHN9iQAWjYARRoxIBkHweMcuzJq3dg/W2LNjH4OVviNObDpy8givjhBwYGBgAAAAD//yJnPKZBS0W+HmQZaFAI1B+xUJOHj7EMBAClpvuvPzDIS2OPoEOnL4GaFMT7lYGBAQAAAP//Iq9W+vuHYU1TDkN3Rhi4AJQRw5+VaA1ATYVrdx9RzxoGBgYAAAAA//8iZ9ghf2pxggYoWYMCREpEENywAw06EQPmbjnI8PrDZwYVHLFLDABlIRAWFYTUhqDy6f6zVwwPXrzFOlRx5sot0LADaFyGOMDAwAAAAAD//yI5xciJCztYaKvA+aDagVDBCQP9K3cwNM9fx5DWMYfhxNU7ZAeKdUYjg2dxF5gNA6BU8/AZ5gA7tCFI2vAmAwMDAAAA//8iOWCkRQXJHn0/cfU2AzMjAwMTIwPD8SvkBQyosAXpB2FQwQ4DoNQL6pagt4ih3QfQdArxgIGBAQAAAP//okrLl1hwAhoYjIyQQCIHgGoykH4QRgdu5nqgcV4U4Y+QgCFtAo6BgQEAAAD//yI5YJ6+fk/2+hQLHUgW/P8f0n4hB4BSBkg/CKNnYUttFYyAAS0dIXlok4GBAQAAAP//IjlgHr18ewA5b5MCQIHx9z8Dw7//DAyW0EAiFYAKem4uTjAGlW/IABRoPGjdlY+fv4LKF9Iik4GBAQAAAP//IqeBt3H1/lMB5LRbQHpAsQzyAHIBTgoA6b+yuAOnFlC/DdS5BA2NgMqXX7//kD6PzcDAAAAAAP//IqeM2bD2wCmysxOo+U/LcRtQqvzwCTJe8waSjQ6SbAgDAwMAAAD//yInYD48evl2Iqg9MhgBKEXBaibo/Djpq60YGBgAAAAA//8it1aa0Dhv3QVYWwTUkSO3XUIMANVEIDuIVQvKQqBRxQ+fv4IChfTUzcDAAAAAAP//IrcTCbLMMax28nwtRekAUGEMmguiFQD1ykHtHmIGw568egtam/fhzbsPoPbWRLLcxMDAAAAAAP//oqR3DQqcQFBMWuqo/KflCN7jV++Ibl2DhiZ+/f4T+Ov3H1DAkLeAiIGBAQAAAP//okoD7/iVOyS3E4gFoNQ4d8sBogtsqFtAAUL+Sk4GBgYAAAAA//+ieDwGCg7sPHXZgJLaBtwxfI1oH4FSCWgc5+qDpwx9OdFE9eCh5RzlkcTAwAAAAAD//6JWwCzcdfJSASUBc/zqHZROISjrYBucwmsGpMtBeXXJwMAAAAAA//+i5qrN88dm1BsM5NiMR3EXqPYSpHhZPQMDAwAAAP//omYnciJodRQhAOoRp3bMAY/LEFsFg1ISaMiCkJpr959SZ68BAwMDAAAA//+iVlYCgQWr95+KT/ZxcMCX/EEdvcZ56xg0rZwZZhy+xXBv3mYGbsbfDFoK0gx80GWwIP2wQAP1wq8/ecMQbIN/lhU6BEF29YwCGBgYAAAAAP//ovbKcAMtRenzO3rL8CoCeTqtbzHDxi3bGAwMIJOEBw5AatYPHz4wXLx4kcHeHrTXggEsb2hoyLCsIh5nAQxq1FlnNn34+OUbaM0d5SmGgYEBAAAA//+i1gJoGHjx+sNnxiev3jm4m+vhVAQakrTQVGRIL65kePPhM9jzGhoaDAoKCmDawcEBzBYQEGAoLCxkMBTnxLsqa9r6vQwHzl+vpMbCZzBgYGAAAAAA//+i1SaL9b250QHowwLYAKjsWHvkAkNQaDg4lYACA5RqDh48yLBv906GQHNNcMcTFwBV0WG1k0FliyHVXM/AwAAAAAD//6JVwIBanft7c6MNiAkcEAB5EHm4E1TOgMojfC1eUJYMr58CykKgQCFr2SpWwMDAAAAAAP//ouW2HJIDhxSAFCiO1GrUwQEDAwMAAAD//6J2GYMMQH3/lbtOXfbg4+aSAK3IpBYA1UBxzTMu/Pz1O5AWgcLAwMAAAAAA//+i1w6386GOZgagKVpiO4PYAKj2AVX1q/efAvWDQNtvaLM/koGBAQAAAP//otcswQctRRmGsLrJZI/bgLIOSP/q/adAKQSUUmi3aZSBgQEAAAD//6JmAw8GYJs+5ZFWSxqAahZw427+OvDqCNAEGTHdB0irdzu4gwnqTHoUd9F+Fy0DAwMAAAD//6JGwIAKD1BA+AsKCjrw8fEJMDMzM3BzczPw80OWvF6+DFnRAKppVjblgifNUjrnMMiKCjGEOJlj1D6gLAPqVO46eQlMgwIRVoDLiQsbPHqJOkVCdcDAwAAAAAD//yI3YEA1Dmhhcb6IiIiBsbExuGEGaoM8f/6c4dq1a3g1g3rhIAzKHqBAmrflAHzdC4wGdRFAveve3GgUvaCZ0Ecv3/aDZkag2Qk2/kI9wMDAAAAAAP//IjVgQKmjXkBAIEFbW5vh169f4JRhYmLCwAJdySkpKclw69Yt8IYJGODg4ACXLehTJqAUBOlXETcVAwrIS/efM+jq6hbIysoysLKyMrx8+ZLh5s2bH96/fw8qkBdSJZAYGBgAAAAA//8itlYCB4iCgkICqHUKaq6DwNGjRxl+/PgBDgwtLS244kuXLjG8fv0azv/58yfD1zfPGAj1ofABUKBENU1nkFdSAUeGkpISg6IiqGsEAevWrWN49+4dw9OnT0EBA9pqTH41zsDAAAAAAP//IqYd08DNzb1eQ0PDwMLCAsUxoBgDBQAocGCBBQKglPT2LaIcAKUm0NKPx89egPcnkQpAZU5GzwIGQQlpcKCAAMgdnJyIcunZs2cMenp6DMbGxgovX77M+PLlCyirnSArVBgYGAAAAAD//8IXMKByZLuUlFQCKDWAssPnz58ZZGRkGJigG61ADnv48CHDv3//GAQFBeEOBfFBZQ0yABXEB05fYhDl52bQJmFUDpRSQIHCzCsEDxRQQIPKNBgAuevp06dgMXFxcQYdHR2Gr1+/erx48QIUW6Rv5GJgYAAAAAD//8LVjgFVs/vV1NQcQEkWBkDlBrKHQQ7k5eXF0AwKJGxAU1OToW7eBpTlG/gAqFwCZR/kQMFm/pcvX1DcAopEf39/Bm1t7QQGBgbQxlHSAAMDAwAAAP//whYwBiwsLPsNDQ0NxMTEMCTRUwKs0AX1iAkBkFpdXV2GrlV7wKN4oCyCC4B63Ykd8xiU1TRQAgUE0CMDlJ1FRUUxjJKTkwNh0gOHgYEBAAAA//9CD5gEbm7u84aGhgLojoEBULLFBpALW3wAFDiqqqoMt998ZbDLacVIPaBUYpXRyLD2+FXwABU7O+rqBRD4/h0RoKDyDVvAgMRBbgUFjri4OChwGogOFQYGBgAAAAD//wMA5wGQHqsDew8AAAAASUVORK5CYII=';
export default image;