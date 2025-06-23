import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [mortgageAnswer, setMortageAnswer] = useState(null);
  const [form, setForm] = useState({
    homePrice: '',
    downPayment: '',
    loanTerm: '',
    interestRate: '',
  });

  //[] represent the dynamic value
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.homePrice ||
      !form.downPayment ||
      !form.loanTerm ||
      !form.interestRate ||
      Number(form.homePrice) <= 0 ||
      Number(form.loanTerm) <= 0 ||
      Number(form.interestRate) <= 0
    ) {
      setMortageAnswer('Please fill out all fields with valid values.');
      return;
    }

    const loanAmount = form.homePrice - form.downPayment;
    const term = form.loanTerm;
    const monthly = 12;
    const interest = form.interestRate / 100;

    const monthlyRate = interest / monthly;
    const numberOfPayments = monthly * term;

    const mortgage =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    const preciseMortgage = mortgage.toFixed(2);
    setMortageAnswer('$' + preciseMortgage);
  };

  return (
    <div className="flex flex-row ">
      <div className=" w-1/2 min-h-screen flex items-center justify-center bg-gray-100">
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
            className="w-full mb-6 p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="w-1/2 flex flex-col justify-center">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Monthly Mortgage Breakdown
        </h1>
        <h3 className="text-xl md:text-3xl mt-7 font-semibold text-center">
          {mortgageAnswer}
        </h3>
      </div>
    </div>
  );
};

export default MortgageCalculator;
