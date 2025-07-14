import { useState, useEffect } from 'react';
import './exchange.css';
import { getRequest, postRequest } from '../../utils/request';

function Exchange() {
    useEffect(() => { 
        getRequest<{ currencies: string[] }>('currency')
            .then(data => {
                console.log("Fetched currencies:", data);
                setCurrencies(data.currencies || []);
            })
            .catch(error => {
                console.error("Failed to fetch currencies:", error);
            }
        );
    }, []);

    const convertCurrency = async () => { 
        if ((!amount || isNaN(parseFloat(amount))) || !baseCurrency || !targetCurrency) {
            console.error("Please fill in all fields.");
            return;
        }

        try {
            const response = await postRequest<{ result: number }>('currency/convert', {
                amount: parseFloat(amount),
                baseCurrency,
                targetCurrency,
            });

            const statisticsResponse = await getRequest<{ paging: { total: number } }>('statistics/');

            console.log(statisticsResponse);

            setResult(response.result);
            setConversionsCount(statisticsResponse?.paging?.total || 0);
        } catch (error) {
            console.error("Error converting currency:", error);
        }
    }

    const [amount, setAmount] = useState('');
    const [baseCurrency, setBaseCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [result, setResult] = useState<number | null>(null);
    const [conversionsCount, setConversionsCount] = useState(0);

    return (
        <div id='exchange'>
            <h1 className='title-main'>Purple currency converter</h1>

            <div className='converter'>
                <div className='field-container'>
                    <div className='label-container'>Amount to convert</div>
                    <input className='input-amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className='field-container'>
                    <div className='label-container'>From</div>
                    <select className='select-currency' value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                        <option value="" disabled hidden></option>
                        {currencies.map((currency, index) => (
                            <option key={index} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <div className='field-container'>
                    <div className='label-container'>To</div>
                    <select className='select-currency' value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                        <option value="" disabled hidden></option>
                        {currencies.map((currency, index) => (
                            <option key={index} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button className='btn-convert' onClick={convertCurrency}>Convert currency</button>

            {result !== null && (
                <div className='result-container'>
                    <div className='label-container'>Result</div>
                    <div className='result-value'>{result} {targetCurrency}</div>

                    <hr className='result-divider' />

                    <div className='result-count'>Number of calculations made</div>
                    <div className='result-count-value'>{conversionsCount}</div>
                </div>
            )}
        </div>
    );
}

export default Exchange;