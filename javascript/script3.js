function toggleScholar(isScholar) {
            const percentageSplit = document.getElementById('percentageSplit');
            if (isScholar) {
                percentageSplit.classList.remove('hidden');
            } else {
                percentageSplit.classList.add('hidden');
            }
        }

        function calculateProfitLoss() {
            // Get input values
            const pixelsValue = parseFloat(document.getElementById('pixelsValue').value);
            const pixelsEarned = parseFloat(document.getElementById('pixelsEarned').value);
            const coinsSpent = parseFloat(document.getElementById('coinsSpent').value);
            const currentPrice = parseFloat(document.getElementById('currentPrice').value);

            // Scholar check
            const isScholar = document.querySelector('input[name="scholar"]:checked').value === 'yes';
            let managerShare = 1;
            let scholarShare = 0;

            if (isScholar) {
                // Get percentage split
                const split = document.getElementById('splitPercentage').value.split('/');
                managerShare = parseInt(split[0]) / 100;
                scholarShare = parseInt(split[1]) / 100;
            }

            // Calculate Total Earned Pixels
            const totalEarnedPixels = pixelsValue * pixelsEarned;

            // Calculate Total Coins Value based on price per 1 million coins
            const totalCoinsValue = parseFloat((coinsSpent * (currentPrice / 1000000)).toFixed(2));

            // Calculate Profit/Loss
            const profitLoss = totalEarnedPixels - totalCoinsValue;

            // Calculate Manager and Scholar Profits if applicable
            const managerProfit = profitLoss * managerShare;
            const scholarProfit = profitLoss * scholarShare;

            // Calculate Coins per Pixel (Rounded to nearest integer, no decimals)
            const coinsPerPixel = coinsSpent !== 0 ? Math.round(coinsSpent / pixelsEarned) : 'N/A';

            // Format coinsPerPixel with comma separators
            const formattedCPP = coinsPerPixel !== 'N/A' ? coinsPerPixel.toLocaleString() : 'N/A';

            // Calculate Pixel Split (if applicable)
            const managerPixels = Math.round(pixelsEarned * managerShare);
            const scholarPixels = Math.round(pixelsEarned * scholarShare);

            // Display the result
            const resultDisplay = document.getElementById('resultDisplay');
            resultDisplay.innerHTML = `
                <p><span>Total Earned Pixels (PHP):</span> ${totalEarnedPixels.toFixed(2)}</p>
                <p><span>Total Coins Value (PHP):</span> ${totalCoinsValue.toFixed(2)}</p>
                <p><span>Profit/Loss (PHP):</span> ${profitLoss.toFixed(2)}</p>
                <p><span>Coins per Pixel (CPP):</span> ${formattedCPP}</p>
                ${isScholar ? `
                    <p><span>Manager Profit (PHP):</span> ${managerProfit.toFixed(2)}</p>
                    <p><span>Scholar Profit (PHP):</span> ${scholarProfit.toFixed(2)}</p>
                    <p><span>Manager Pixels:</span> ${managerPixels} pixels</p>
                    <p><span>Scholar Pixels:</span> ${scholarPixels} pixels</p>
                ` : ''}
            `;
        }

        function goBack() {
            window.location.href = 'index.html';
        }