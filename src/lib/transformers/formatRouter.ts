import { DataFormat, ParsedData } from '../types';
import { parseJSON } from '../parsers/jsonParser';
import { parseTOON } from '../parsers/toonParser';
import { parseSLD } from '../parsers/sldParser';
import { parseCSV } from '../parsers/csvParser';
import { parseTSV } from '../parsers/tsvParser';
import { parseYAML } from '../parsers/yamlParser';
import { dataToJSON } from './toJson';
import { dataToTOON } from './toToon';
import { dataToSLD } from './toSld';
import { toCSV } from './toCsv';
import { toTSV } from './toTsv';
import { toYAML } from './toYaml';

/**
 * Main transformation router that handles conversion between any two formats
 */
export function transformData(input: string, fromFormat: DataFormat, toFormat: DataFormat): string {
  // If same format, return input as-is
  if (fromFormat === toFormat) {
    return input;
  }

  // Step 1: Parse input to intermediate representation
  let parsedData: ParsedData;

  switch (fromFormat) {
    case 'JSON':
      parsedData = parseJSON(input);
      break;
    case 'TOON':
      parsedData = parseTOON(input);
      break;
    case 'SLD':
      parsedData = parseSLD(input);
      break;
    case 'CSV':
      parsedData = parseCSV(input);
      break;
    case 'TSV':
      parsedData = parseTSV(input);
      break;
    case 'YAML':
      parsedData = parseYAML(input);
      break;
    default:
      throw new Error(`Unsupported input format: ${fromFormat}`);
  }

  // Step 2: Convert to target format
  switch (toFormat) {
    case 'JSON':
      return dataToJSON(parsedData);
    case 'TOON':
      return dataToTOON(parsedData);
    case 'SLD':
      return dataToSLD(parsedData);
    case 'CSV':
      return toCSV(parsedData);
    case 'TSV':
      return toTSV(parsedData);
    case 'YAML':
      return toYAML(parsedData);
    default:
      throw new Error(`Unsupported output format: ${toFormat}`);
  }
}
