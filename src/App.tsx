import { useState } from 'react';
import { Layout } from './components/Layout';
import { FormatSelector } from './components/FormatSelector';
import { TextAreaPanel } from './components/TextAreaPanel';
import { MetricsPanel } from './components/MetricsPanel';
import { InfoSection } from './components/InfoSection';
import { DataFormat, TransformationResult } from './lib/types';
import { transformData } from './lib/transformers/formatRouter';
import { parseJSON } from './lib/parsers/jsonParser';
import { dataToJSON } from './lib/transformers/toJson';
import { estimateTokenCount, calculateSavings } from './lib/utils/tokenEstimator';
import { getExample } from './lib/utils/examples';

function App() {
  const [inputFormat, setInputFormat] = useState<DataFormat>('JSON');
  const [outputFormat, setOutputFormat] = useState<DataFormat>('TOON');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [metrics, setMetrics] = useState<TransformationResult | null>(null);

  const handleTransform = () => {
    setError('');
    setSuggestion('');
    setOutputText('');
    setMetrics(null);

    if (!inputText.trim()) {
      setError('Input is empty');
      setSuggestion('Please paste some data or load an example');
      return;
    }

    try {
      // Perform transformation
      const output = transformData(inputText, inputFormat, outputFormat);
      setOutputText(output);

      // Calculate metrics
      const inputCharCount = inputText.length;
      const outputCharCount = output.length;
      const inputTokenCount = estimateTokenCount(inputText);
      const outputTokenCount = estimateTokenCount(output);

      // Get JSON version for comparison
      let jsonCharCount = inputCharCount;
      if (inputFormat !== 'JSON') {
        try {
          const parsed = transformData(inputText, inputFormat, 'JSON');
          jsonCharCount = parsed.length;
        } catch {
          // If conversion to JSON fails, use input as reference
          jsonCharCount = inputCharCount;
        }
      }

      // Calculate savings percentage
      const savingsPercentage = calculateSavings(jsonCharCount, outputCharCount);

      setMetrics({
        output,
        inputCharCount,
        outputCharCount,
        inputTokenCount,
        outputTokenCount,
        savingsPercentage,
        jsonCharCount,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(errorMessage);

      // Provide helpful suggestions based on error
      if (errorMessage.includes('Invalid JSON')) {
        setSuggestion('Check for missing commas, quotes, or brackets in your JSON');
      } else if (errorMessage.includes('TOON')) {
        setSuggestion('TOON format should start with: collectionName[count]{field1,field2,...}:');
      } else if (errorMessage.includes('SLD')) {
        setSuggestion('SLD format should be: collectionName|count|fields|records');
      }
    }
  };

  const handleLoadExample = () => {
    const example = getExample(inputFormat);
    setInputText(example);
    setError('');
    setSuggestion('');
    setOutputText('');
    setMetrics(null);
  };

  const handleInputFormatChange = (format: DataFormat) => {
    setInputFormat(format);
    setInputText('');
    setOutputText('');
    setError('');
    setSuggestion('');
    setMetrics(null);
  };

  const handleOutputFormatChange = (format: DataFormat) => {
    setOutputFormat(format);
    setOutputText('');
    setMetrics(null);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Format Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormatSelector
            label="Input Format"
            value={inputFormat}
            onChange={handleInputFormatChange}
          />
          <FormatSelector
            label="Output Format"
            value={outputFormat}
            onChange={handleOutputFormatChange}
          />
        </div>

        {/* Main Transformation Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border 
                        border-gray-200 dark:border-gray-700">
            <TextAreaPanel
              title="Input"
              value={inputText}
              onChange={setInputText}
              placeholder={`Paste your ${inputFormat} data here...`}
              format={inputFormat}
              onLoadExample={handleLoadExample}
              error={error}
              suggestion={suggestion}
            />
          </div>

          {/* Output Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border 
                        border-gray-200 dark:border-gray-700">
            <TextAreaPanel
              title="Output"
              value={outputText}
              readOnly
              placeholder={`Transformed ${outputFormat} data will appear here...`}
              format={outputFormat}
              onCopy={() => console.log('Copied to clipboard')}
              onDownload={() => console.log('Downloaded file')}
            />
          </div>
        </div>

        {/* Transform Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleTransform}
            disabled={!inputText.trim() || inputFormat === outputFormat}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                     text-white font-semibold rounded-lg shadow-lg 
                     transform transition-all hover:scale-105 active:scale-95
                     disabled:cursor-not-allowed disabled:hover:scale-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {inputFormat === outputFormat ? 'Select Different Formats' : 'Transform →'}
          </button>
        </div>

        {/* Metrics Panel */}
        <MetricsPanel result={metrics} />

        {/* Info Section */}
        <InfoSection />
      </div>
    </Layout>
  );
}

export default App;
