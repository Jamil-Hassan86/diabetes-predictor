import React from 'react';

const EthnicityAdvice = ({ ethnicity }) => {
  const advice = {
    'south-asian': 'South Asians are at higher risk of diabetes. Focus on a diet rich in fiber and complex carbohydrates, and engage in regular physical activity.',
    'african': 'Africans are at higher risk of hypertension and diabetes. Monitor your blood pressure regularly and maintain a healthy weight.',
    'eastern-pacific': 'Eastern Pacific Islanders are at higher risk of obesity and diabetes. Limit your intake of processed foods and sugary drinks.',
    '': 'General health advice: Maintain a healthy weight, eat a balanced diet, and exercise regularly.',
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Health Advice for {ethnicity || 'All'}</h2>
      <p className="text-lg">{advice[ethnicity] || advice['']}</p>
    </div>
  );
};

export default EthnicityAdvice;
