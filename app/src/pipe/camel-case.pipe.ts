import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'camelCaseConvert' })
export class CamelCaseConvert implements PipeTransform {
    transform(camelCase: string): string {
        var result = camelCase.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}