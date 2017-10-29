import {Column} from '../types/interfaces';

export class ColumnUtils {

  public static getOptionName(value: any, column: Column) {
    if (column.options) {
      let name = null;
      let options;
      if (typeof column.options === 'function') {
        options = column.options();
      } else {
        options = column.options;
      }
      if (options) {
        for (const el of options) {
          if (el['id'] === value) {
            name = el['name'];
            break;
          }
        }
      }
      return name;
    } else {
      return value;
    }
  }

  public static getOptions(column: Column, dependsValue: any) {
    if (column.options) {
      let options;
      if (typeof column.options === 'function') {
        options = column.options();
      } else {
        options = column.options;
      }
      if (column.dependsColumn) {
        return options.filter((value) => value.parentId === dependsValue);
      } else {
        return options;
      }
    }
  }

  public static getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  findSelectedIndex(selectedItem: any, items: any): number {
    const obj = items.find(x => JSON.stringify(x) === JSON.stringify(selectedItem));
    const index = items.indexOf(obj);
    return index;
  }

}
