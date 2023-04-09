- текущая библиотека содержит одну функцию `lopPathsFind()` и одну константу `ISARR`
- функция `lopPathsFind()` повзволяет сделать то что не позволяет сделать `lodash.get()`, а именно -- `lodash.get()` не позволяет получить значение элемента в глубине объекта, если он расположен в массиве (на любом из уровней объекта), и вы не знаете точно на каком из индексов этого массива (массивов) он расположен
- функция `lopPathsFind()` решает это за счёт пометки мест расположения массивов, специальной константой `ISARR`. Путь с такими пометками называется `lopPath`
- пример `lopPath`: 
    ```
    `elems.${ISARR}.name`
    ``` 
    - эта запись говорит что `elems` это массив, и мы хотим получить все значения ключа `name` элементов этого массива 
- функция `lopPathsFind()` пробегает по всем элементам массивов пути в поисках указанного вами элемента пути
- сигнатура функции `lopPathsFind()`:
  ```text
  lopPathsFind(target: any, lopPath: string, predicate?: (val: any) => boolean): RetType[]
  ```
  - где 
    - `target` - объект/массив значения из которого мы хотим получить
    - `lopPath` - lopPath-путь 
    - `predicate` - (опционально) если вы хотите отбирать в итоговый результат не все элементы, а только те которые удовлетворяют этому предикату
    - `RetType` :
      ```typescript
      interface RetType {
        /** путь к значению */
        path: string,
        /** значение */
        value: any
        /** существует ли указанный path; если не существует в `value` будет undefined */
        isHas: boolean;
      }
      ```

# Примеры
- пример 1, без 3-го параметра
    ```typescript
    import { ISARR, lopPathsFind } from 'loppathsfind';

    const obj = {
      a: [
        { b: 1 },
        { c: 2 },
        { c: 3 },
        { c: 2 },
      ],
    };
    
    const lopPath = `a.${ISARR}.c`;
    const result = lopPathsFind(obj, lopPath);
   
    // result
   
    /*
    [
      { path: 'a.0.c', value: undefined, isHas: false },
      { path: 'a.1.c', value: 2, isHas: true },
      { path: 'a.2.c', value: 3, isHas: true },
      { path: 'a.3.c', value: 2, isHas: true }
    ]
    */
    ```
- пример 2, с 3-м параметром
    ```typescript
    import { ISARR, lopPathsFind } from 'loppathsfind';

    const obj = {
      a: [
        { b: 1 },
        { c: 2 },
        { c: 3 },
        { c: 2 },
      ],
    };
    
    const lopPath = `a.${ISARR}.c`;
    const result = lopPathsFind(obj, lopPath, (val) => val === 2);
   
    // result
   
    /*
    [
      { path: 'a.1.c', value: 2, isHas: true },
      { path: 'a.3.c', value: 2, isHas: true }
    ]
    */
    ```
- также см. тесты - `/test/lopPathsFind-ts.test.ts`

# Разное
- используемый пакет-менеджер - `yarn`
- используется библиотека `tsdx` для билда текущей библиотеки

# Что зачем
- root/babel.config.js - для Jest
- root/jest.config.js - для Jest
- root/tsconfig.json - для TypeScript