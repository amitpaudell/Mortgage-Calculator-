import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [mortgageAnswer, setMortageAnswer] = useState(null);
  const [form, setForm] = useState({
    homePrice: '',
    downPayment: '',
    loanTerm: '',
    interestRate: '',
    mortgageType: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { homePrice, downPayment, loanTerm, interestRate, mortgageType } =
      form;

    if (
      !homePrice ||
      !downPayment ||
      !loanTerm ||
      !interestRate ||
      !mortgageType ||
      Number(homePrice) <= 0 ||
      Number(loanTerm) <= 0 ||
      Number(interestRate) <= 0
    ) {
      setMortageAnswer('Please fill out all fields with valid values.');
      return;
    }

    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let mortgage;

    if (mortgageType === 'interestOnly') {
      mortgage = (loanAmount * monthlyRate).toFixed(2);
    } else if (mortgageType === 'adjustable') {
      const adjRate = (Number(interestRate) + 1) / 100 / 12;
      mortgage = (
        (loanAmount * adjRate) /
        (1 - Math.pow(1 + adjRate, -numberOfPayments))
      ).toFixed(2);
    } else {
      mortgage = (
        (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments))
      ).toFixed(2);
    }

    setMortageAnswer(`Monthly Payment: $${mortgage}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Mortgage Calculator
          </h2>

          <label className="block mb-2 text-sm">Home price</label>
          <input
            type="number"
            name="homePrice"
            value={form.homePrice}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2 text-sm">Down payment</label>
          <input
            type="number"
            name="downPayment"
            value={form.downPayment}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2 text-sm">Loan term (years)</label>
          <input
            type="number"
            name="loanTerm"
            value={form.loanTerm}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2 text-sm">Interest rate (%)</label>
          <input
            type="number"
            step="0.01"
            name="interestRate"
            value={form.interestRate}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2 text-sm">Mortgage Type</label>
          <select
            name="mortgageType"
            value={form.mortgageType}
            onChange={handleChange}
            className="w-full mb-6 p-2 border border-gray-300 rounded"
          >
            <option value="">Select type</option>
            <option value="fixed">Fixed Rate</option>
            <option value="adjustable">Adjustable Rate</option>
            <option value="interestOnly">Interest-Only</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="md:w-1/2 p-6 flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          Monthly Mortgage Breakdown
        </h1>
        <h3 className="text-xl md:text-2xl mt-7 font-semibold text-blue-700">
          {mortgageAnswer}
        </h3>
        {form.mortgageType === 'interestOnly' && (
          <p className="text-sm text-gray-500 mt-2">
            This estimate reflects interest-only payments.
          </p>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
