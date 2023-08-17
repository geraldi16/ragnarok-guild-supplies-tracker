export function generateTable(data, headers, title) {
    const maxWidths = headers.map((header, index) =>
        Math.max(header.length, ...data.map(row => String(row[index]).length))
    );

    const separator = '+-' + maxWidths.map(width => '-'.repeat(width)).join('-+-') + '-+';

    const rows = [separator, '| ' + headers.map((header, index) => padString(header, maxWidths[index])).join(' | ') + ' |', separator];
    data.forEach(row => {
        rows.push('| ' + row.map((cell, index) => padString(String(cell), maxWidths[index])).join(' | ') + ' |');
    });
    rows.push(separator);

    return '```' + `${title ? title + '\n' : ''}` + rows.join('\n') + '```';
}

// Function to pad a string to a certain width
function padString(string, width) {
    return string + ' '.repeat(width - string.length);
}

/**
 * parse array of object data into array of array specific chosen attributes
 * @param {*} data ModelObject[]
 * @param {*} attributes string[]
 * @returns string[][]
 */
export function dataIntoArray(data, attributes) {
    return data.map((datum) => attributes.map((attribute) => datum[attribute]?.toLocaleString('en')));
}