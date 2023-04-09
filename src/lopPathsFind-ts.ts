import loGet from 'lodash/get';
import loHas from 'lodash/has';

export const ISARR = '$$$';

/**
 * Делает копию {@param val} и удаляет из неё последнюю точку (если таковая есть) и возвращает эту копию
 */
function removePointLast(val: string): string {
  if (!val) return val;
  return val.split('.').filter(Boolean).join('.');
}

/**
 * Рекурсивная функция.
 * Возвращает все *ло-пути (см. [asau217]) из {@param arr} существующие в {@param target}.
 */
function findPaths(arr: string[], target: any) {

  const pathIndex = arr.findIndex(el => el.includes(ISARR));
  if (pathIndex !== -1) {
    // ^ если в arr есть элемент содержащий подстроку {ISARR}
    // берём этот элемент
    const path = arr[pathIndex];
    const pathElems = path.split(ISARR);
    const fPath = removePointLast(pathElems[0]);
    // --- len; кол-во элементов массива fPath; + другие действия
    let len = 0;
    if (!fPath) {
      len = target.length;
    } else {
      const val = loGet(target, fPath);
      if (!Array.isArray(val)) {
        // удаляем путь из arr
        arr.splice(pathIndex, 1);
      } else {
        len = val.length;
      }
    }
    // ---
    if (len > 0) {
      const sArr = [];
      for (let ix = 0; ix <= len - 1; ix++) {
        const nPath = path.replace(ISARR, ix + '');
        sArr.push(nPath);
      }
      arr.splice(pathIndex, 1, ...sArr);
    }
    // ---
  }

  if (arr.find(el => el.includes(ISARR))) {
    findPaths(arr, target);
  }

  return arr;
}

interface RetType {
  path: string;
  value: any;
  /** существует ли указанный path */
  isHas: boolean;
}

/**
 *
 * @param target
 * @param lopPath
 * @param predicate если указан, то значение попадает в результат если удовлетворяет этому предикату
 * @returns {*[]}
 */
export function lopPathsFind(target: any, lopPath: string, predicate?: (val: any) => boolean): RetType[] {
  const arr0 = [lopPath];
  const paths = findPaths(arr0, target);
  const res: RetType[] = [];
  paths.forEach((el: string) => {
    const value = loGet(target, el);
    const isHas = loHas(target, el);
    if ((predicate && predicate(value)) || !predicate) {
      res.push({ path: el, value, isHas });
    }
  });
  return res;
}
