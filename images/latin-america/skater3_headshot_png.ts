/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABHCAYAAAC6cjEhAAAACXBIWXMAAAsSAAALEgHS3X78AAAQRklEQVR4nGIYBVgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//8axdgAAwMDAAAA//9ipFPACDAwMDgwMDAYMDAw2IP4vLy8IDZO8Pnz5wsMDAwPGBgYLjIwMByAYvoABgYGAAAAAP//tNDBCcAgDEDRDzkpxhXtat2goylKIDkVN/DiAu/wbsbsjAdoO6GWgqqSU0JEjgCPwMyYa9HH6O7+Ae/1JOAHAAD//6JVwDSws7Pni4uKCogICxMdEIQAKICePn8OSk2ggEmEpijqAwYGBgAAAAD//6J2wICyx3xpSUkDKUlJWrkZHED3Hz4EpaBCBgaGBVS3gIGBAQAAAP//ombAGLAwM+9XV1MTAGUXWoO/f/8y3Lh1i+Hb9++glEPdwGFgYAAAAAD//6JWwFAUKCBPvnz1iuH9hw8MzCwsELE/fxi4uLgYQCmPnY0Npz6aBA4DAwMAAAD//6JGwAiwsLCcV1dVVSAnUECB8fjJE3AACAoIoJRHILlnz58zyMnKMvDy8GDVDwqcqzdugLKVIdXKHAYGBgAAAAD//6JGqdguIyXlAfIUqeDRkycMX758YVBTUWHg4eZmYGJiQjGCk4ODQVhIiOHWnTsMAgICDCxYCnGQHi4uLo43b9+CyjdQjUU5YGBgAAAAAP//ojRgFNjZ2FYoKyqSrBGUGkCBoqKkhBEgyAAkx8bGxvD6zRtwisIGQFnt169fCt++fz9IlVTDwMAAAAAA///C7SLiQD65tc/3799xZg90AAoQUHsGH4C6I59C/0AAAwMDAAAA//9ioUgzM3MCqJ1CDhAXE2O4fe8ew5u3b8EeB6UKdnZ2st0CSjVcnJwB375/V6A41TAwMAAAAAD//6IkYBwEQBmfTAAqZDVUVcGF57fv3yEt3M+fGf4xMDD4+nphmLp58zawWnyNRVAkPXryBNT1oKyGYmBgAAAAAP//oixg+PkpshwUICDPggCoagaBj58/g2lJSUkwBgFjY1CFw8Cwb89+nOUMCIC6HNC+GGUBw8DAAAAAAP//oiRg7GGeIRaA+j4fPnxgeP/xI4MANxvD2w+fGVjYOMCpAFTmGGnIMqhKSTI8v3UejEEApKb/wxeGbz9+MTx7/QHc6gWVTXy8vBipB9pcwNs5JQowMDAAAAAA//+iJGAEcDW80AHIM6AGHA8HM4OzhTaDgYY8AxcHG8OxC7cZNh68DK6KQSnHykCVQU0Bd2G+98RVho0HLjB8//GD4fHTp+AAQm8AgjqsoCxJEWBgYAAAAAD//yI7YAgNG4AAyLOgtoowLxtDcoAVhqdBAbFm1ylwR/zXr194AwUEQIF64cZDhm9/WRhYWFjA1f3N27cZpCQkwOUL1QADAwMAAAD//6K0usYJQOXH7Tu3GJxNVRmKE7xwetpcT5nh06dPDKIC3ESZa2mgyvDx40eGly9fgmsyCQkJhpevX4M6lWB5aOoBFcDkAwYGBgAAAAD//6JJwICq4E/vXzFUpfqBYxkfAKUakEfVFCSIMhuUDX/8+MHAxPCP4eP7t2AxUVFRsJ0gTGz2xgsYGBgAAAAA//+iesCAHPfn5xdwKhEWINyAk5UQZmBjYQIHEDEAVDYpSgkzOJppMcT52YBTDqh1zMHBAc62oAKeYsDAwAAAAAD//6KogYctUNgYfzHkJ3iBPYAO3n74Aq5lYEBGQhisDpQKQAFELIAV4CBgbfCc4cLtFwycnJzgrAVyA8WAgYEBAAAA//8iO2BAwwLogQLK5wkBdhiBAqp9QDXKu88/GLi5IWUJqGAGZQkhXg64J7EF5OYD5xgev3gH1gsC3BwsDFKiAmA7QOWWr4MRw8lLqxm4efnBBTgo5fz48YOyli8DAwMAAAD//yI7YL59/w4arAbXTKBAAQ05gmJMHamQffziLcO0FXsYmNm4GAQEhBkUhFkxzPn9+zfDscsPwWqzIlxQ5Fpnb2IQERVn4BOWYOBDSlCff/xgmLn2MIOytBA4IkDZau+pG+CaCgooCxgGBgYAAAAA//8ip4yBjfgL3Ll3j+HG7dsMz168ALdS+Xk4UMqVmav3MwgIi4MLR1ZWzEABAZA4qMWKnpVuPXjOwM7BBU9hyACUKuTk5Bhef/7D0LtgG7h8AnUpQCmGKoCBgQEAAAD//yIlxYBSRz2oowbyCKhxBev0PXz8GFwACvGhegLUWmX4/BncBwI5GpQ6sHkSAoRQxIUFeMHVOCi7YQMg+0DlytevPxj2nLgCzo6Xbj0GSVE+7MDAwAAAAAD//yI2YATY2dn3K8rLC6APFYDKij9//oAxPzdq2dKSG8Lw5AWkMOTkYMNawIJSxs0HLzCqdVDKy492hRfQ6ABWkIP0fvvxE5yFQY0/qgQMAwMDAAAA//8iNmAMRISEMAIFVDWChiVBKQHUCjVQRh2wghWQyACUikAFqqGGPFgOhrEBbHpBhbiBhhw4kEGBB1MDKqNAYo9fvP1AdmjAAAMDAwAAAP//oqgdA6qFQE39qlRfBh524ow6Dq2h5m84RLJ9IL2gQN18ANLBRAagQIG2hUBZfj8DA0MAyRbAAAMDAwAAAP//IjbFXADVPMijdaAsJCWMiLHaDOLcAS53oFmBVPAG2gb6DjUDm9lZES4KshLCCpUTVoKEQDOXpAMGBgYAAAAA//8iNsV8+PnrVyOoFgJlH1CggFILoU4fvQEoa8GymKyEMPn9JQYGBgAAAAD//yKlVmp4/+HDhfcfPsRDq+wHbz98Bs1NkwRg1Tlye4dYACu8cXU1kLsV2ApsogEDAwMAAAD//yK1gQdKmvDk+fjFO5IDBuR4UFbA1dolpBcEiNF788FzUAOUPMDAwAAAAAD//6Ko8H384u0FWJlBCgBVzcR0MLEBUOAQSg2gGoqiapuBgQEAAAD//6K0d70Q2nYYVODWgxcgaiPZjmJgYAAAAAD//6I0YDaAqk8YAFWj0NiiOwD1yWAA1BKmpEZiYGBgAAAAAP//ojRgHrz98KVxAbRNIishBO5J0xuAIgOWvUD2v/3wBTRLQH5Dj4GBAQAAAP//osZAVcOxC7cngDpzoPIGmoypBlbuOEHQLFBggApkkP2rdp4EBUgjRQ5gYGAAAAAA//+i1kBV4c0HzxfefPAc1MqLf/vhiwKphSuswQfTB2v+P3nxjqBeUGSACmVw5Hz/SflKKwYGBgAAAAD//6LFUrMEZwvt+eEeFiRpAnUmQWUUKEBAnUIRAV7oQBRksg2fPlD58u3HL9DyM1BKoXx9HgMDAwAAAP//oskaPC5O9vcTymPInr4lBYDKt2MXbgdSWtiiAAYGBgAAAAD//6LJLMG37z8nEiqEQSkDWlBSZNfFm49A2YaqgcLAwMAAAAAA//+i6mA4Eliw+cC5ekIj/6Cq/oCACIOCggLD4wd3GFgYIPPY2ABo1gEdgAL26/efVFssBAcMDAwAAAAA//+i1YQbuBoHFZ64AKh6BY3x/vrxjaG+vp7hzv3HDDfuP8PAlg7uDDISqKN7MABtQ1F/1SYDAwMAAAD//6LZTCQDA8OEzQfPf8DXZQB1CnMjHBkyEqMYEhMTGR48QFQmIHZgYCDDrQtHGbAV5NBsOIEma30ZGBgAAAAA//+i9ZL5AAMN+fXoo//YAMij4O4FhyBY+vuHl+DpWGzZEVQuNc/c8OHb95+gIUOqjNihAAYGBgAAAAD//6LHXoIGWQnhelDgkNtxRAfNMzaAWrtUr4nggIGBAQAAAP//os5advzgwKcv3w8ev3gnQEKEn0NChLJaHFQ9X73zBNRemUEzFzMwMAAAAAD//6JHwIDAg99//np8+vJdAdSvUZIRY2BlId1qaJsFVNiClsrTDjAwMAAAAAD//6Jl4YsBQFUuqEULarqDWqzEAlABDmrdgvpk0M0VtAUMDAwAAAAA//+iVTsGGwDnIdiEPKhzCOoCgJr8+MaOQQEImlGA1kA0TylgwMDAAAAAAP//otdGLtAY73/0RhrI03tOXAXXMqDAUkdaI/PmwxfwdAls7mjBhkOgcqWBLo5lYGAAAAAA//+idYoBrbkFYaxVKmyyDRQwN6EzkjAAagCCJuxBAUNKtqMKYGBgAAAAAP//olXAgAJjvoa2kYO6thHDzavnGL6+xT0ECvI8EQuH/Om2BZCBgQEAAAD//6JFVnLg5uZdn1PWIQAKFBiYO7WF4f/7W+BUQCoApZi9174wcHHzMhzdvxUUMBNp2YZhYGBgAAAAAP//onZ1nSCnoLq+oWcRh6Q06hSHkZkdw/nLVxkuXDhH8tTJhRuPGOR1HRn8w1IYrB29Fb59+xLx+MFt0NTNR5A0lf3AwMDAwAAAAAD//6JWwICyToGcgmp/WeM0Bi5u7C1ccgNnx5FLDI6+ieAUA8Igc6wdvQW4uHkDnjy8k/D7109QAIH6TNjXjJAKGBgYAAAAAP//orQdA5oGnQ+a3+fi5qnPKe/EGSgwkJxdw8AoqAZurBEDQAXzux9sDCKiqFU6iO/qHc7gF5qkwMXNA3IDaKYfFEGUAwYGBgAAAAD//yI3xYCS8XwzS+uKoNAog6dPHjPw8AowsLKxM/z5/YtBRAz/9Csoxt9+/sWwZMUqBlMdJbytYNDQhZ5NIIOcghqY/+jBbYZt6xczrF06jeH0sR0MjP9/Mrx/9/bD92/fdkCz1g2KQ4aBgQEAAAD//yKl8AU10Aq4uLjz7Z1cBMwsrBmEhEXgkk+fPGK4c+smw+1bNxguX4Qs0wCVCf5hyTgNPHpgK8OuNdPB4zLYOpigFm/L7G0MDX0r4Cnx/KlDDHOnNjMkp2UzqKipo9h/8vhRhtMnjn349u0rqNsAKqDJG5JgYGAAAAAA//8iJsWAkme/sIjojKCQSI/45HQOFTUNBk60DRavXrxguH7tMsOLp08YCouKGUAhbukUwMAvgHuZKigVKGuZMkycOp1BVpwfvLwMGYDKFk0LPwYNpNoNVKjrGFoyzJ3WxSAkLMwgLgFJnXx8/Aya2roMLu5eHDKychafPn0qePf2DSirg9oJpAUQAwMDAAAA///Cl2LAKURYRDTfw8tPwMzSGquiU8ePMpw8cZRBWlKCITwyksHIyJjh0MEDDA0NDQzJ2bUYZQ4oK3z7+oVBREwCpdxYPn8Cg6WGMHzJGaizuXDHVYaGnkUoekEp5vypgwy/f35leP78GQPIXcLCIgwqqhoM0rKyDJyciAjbsXUjw8vnTxjOnT1L2gZ2BgYGAAAAAP//whUwBnx8/OtVVFUU3r59By47QLEjIyMHTr6gLAQKkLOnTzBYWlgwhEdGwfcWgcDz58/Bjj539iyGwZKSUgySoK03zyBqQOD2rVsMt27dAvNBtRVoxG7a6kMMUWk1YPlzoMA4fYhBW1Odwc7egcHe3p6BB7I3CUXvuXNnGR48eAh2o6qqBsPt2zcYEuLjwOrKS0s/fP78yZGo6p2BgQEAAAD//wMAXKlOERSWFJgAAAAASUVORK5CYII=';
export default image;