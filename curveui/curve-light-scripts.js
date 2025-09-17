        // Theme system with 3 themes
        const themes = ['light', 'dark', 'chad'];
        const themeFiles = {
            'light': 'curve-light-styles.css',
            'dark': 'curve-dark-styles.css',
            'chad': 'curve-chad-styles.css'
        };
        
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme on load
        if (currentTheme && themeFiles[currentTheme]) {
            document.getElementById('theme-stylesheet').href = themeFiles[currentTheme];
            document.documentElement.setAttribute('data-theme', currentTheme);
            updateThemeIcon(currentTheme);
        }
        
        // Theme toggle function - cycles through 3 themes
        function toggleTheme() {
            const themeLink = document.getElementById('theme-stylesheet');
            const currentHref = themeLink.href;
            
            // Determine current theme
            let currentTheme = 'light';
            if (currentHref.includes('curve-dark-styles.css')) {
                currentTheme = 'dark';
            } else if (currentHref.includes('curve-chad-styles.css')) {
                currentTheme = 'chad';
            }
            
            // Get next theme in cycle
            const currentIndex = themes.indexOf(currentTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            const nextTheme = themes[nextIndex];
            
            // Apply new theme
            themeLink.href = themeFiles[nextTheme];
            localStorage.setItem('theme', nextTheme);
            document.documentElement.setAttribute('data-theme', nextTheme);
            updateThemeIcon(nextTheme);
            
            // Update chart colors if chart exists
            if (window.currentChart) {
                updateChartTheme();
            }
            
            // Redraw bar chart with new theme colors (including legend)
            if (window.renderChart) {
                renderChart();
            }
            
            // Redraw distribution pie chart with new theme colors
            const distributionType = document.querySelector('input[name="distributionType"]:checked')?.value || 'token';
            if (window.switchDistributionChart) {
                switchDistributionChart(distributionType);
            }
            
            // Update protection chart with new theme colors
            updateProtectionChart();
        }
        
        function updateThemeIcon(theme) {
            const icon = document.getElementById('themeIcon');
            const tooltip = document.getElementById('themeTooltip');
            if (!icon) return;
            
            if (theme === 'dark') {
                // Moon icon for dark theme
                icon.innerHTML = `<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>`;
                if (tooltip) tooltip.textContent = 'Mode';
            } else if (theme === 'chad') {
                // Chad icon for Chad theme  
                icon.innerHTML = `<image href="CHAD.png" x="0" y="0" width="24" height="24"/>`;
                if (tooltip) tooltip.textContent = 'Mode';
            } else {
                // Sun icon for light theme  
                icon.innerHTML = `<path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"/>`;
                if (tooltip) tooltip.textContent = 'Mode';
            }
        }
        
        function updateChartTheme() {
            const theme = localStorage.getItem('theme') || 'light';
            const chartOptions = window.currentChart.options;
            
            // Define colors for each theme
            let textColor, gridColor;
            
            if (theme === 'dark') {
                textColor = '#8b8c8e';
                gridColor = 'rgba(255, 255, 255, 0.05)';
            } else if (theme === 'chad') {
                textColor = '#6b46c1';
                gridColor = 'rgba(107, 70, 193, 0.1)';
            } else {
                textColor = '#666666';
                gridColor = 'rgba(0, 0, 0, 0.05)';
            }
            
            // Update grid and text colors
            if (chartOptions.scales) {
                if (chartOptions.scales.x) {
                    chartOptions.scales.x.ticks.color = textColor;
                    chartOptions.scales.x.grid.color = gridColor;
                }
                if (chartOptions.scales.y) {
                    chartOptions.scales.y.ticks.color = textColor;
                    chartOptions.scales.y.grid.color = gridColor;
                }
            }
            
            if (chartOptions.plugins && chartOptions.plugins.legend) {
                chartOptions.plugins.legend.labels.color = textColor;
            }
            
            window.currentChart.update();
        }
        
        // Expose toggleTheme to window for onclick handler
        window.toggleTheme = toggleTheme;
        
        // Language system
        let currentLang = localStorage.getItem('liquidationLang') || 'en';
        
        const translations = {
            en: {
                title: 'Curve Finance Liquidation Protection Analysis',
                softLiquidations: 'Soft Liquidations',
                hardLiquidations: 'Hard Liquidations',
                comparison: 'Comparison',
                filters: 'Filters',
                platform: 'Platform',
                allPlatforms: 'All Platforms',
                network: 'Network',
                allNetworks: 'All Networks',
                token: 'Token',
                allTokens: 'All Tokens',
                market: 'Market',
                user: 'User',
                liquidator: 'Liquidator',
                debt: 'Debt',
                discount: 'Discount',
                date: 'Date',
                dateAndTime: 'Date and Time',
                dateFilter: 'Date Filter',
                applyFilters: 'Apply Filters',
                resetFilters: 'Reset',
                chartByDays: 'Analysis for Period',
                day: 'Day',
                week: 'Week',
                month: 'Month',
                count: 'Positions',
                sum: 'Size ($)',
                start: 'Start',
                end: 'End',
                maxTVL: 'Max TVL',
                txHash: 'Tx Hash',
                noData: 'No data',
                noEventsMatchingFilters: 'No events matching filters',
                noPositionsMatchingFilters: 'No positions matching filters',
                showing: 'Showing',
                of: 'of',
                softLiquidationsCount: 'soft liquidations',
                hardLiquidationsCount: 'hard liquidations',
                byMarkets: 'By Markets',
                byPlatforms: 'By Platforms',
                byTokens: 'By Tokens',
                byNetworks: 'By Networks',
                softPositions: 'Soft Positions',
                hardEvents: 'Hard Events',
                totalSoftTVL: 'Total Soft TVL',
                totalHardDebt: 'Total Hard Debt',
                apply: 'Apply',
                cancel: 'Cancel',
                selectValidDate: 'Please select a valid date',
                softLiquidationsInPositions: 'Positions in Liquidation Protection Mode (in soft liquidation)',
                dateFrom: 'From',
                dateTo: 'To',
                loadingData: 'Loading data...',
                averageSize: 'Average size',
                liquidationsPerUser: 'Liquidations per user',
                averageDiscount: 'Average discount',
                softPositionsCount: 'Soft positions',
                totalTVL: 'Total TVL',
                debtWithoutDiscount: 'Debt without discount',
                debtWithDiscount: 'Debt with discount',
                events: 'Events',
                hardLiquidationsLabel: 'HARD LIQUIDATIONS',
                quickFilters: 'Quick Filters',
                positions: 'positions',
                protectedFromLiquidation: 'PROTECTED FROM LIQUIDATION',
                protectionStatus: 'Protection Status',
                platformDistribution: 'Platform Distribution',
                networkDistribution: 'Network Distribution', 
                tokenDistribution: 'Token Distribution',
                ofTVLInSoft: 'of TVL in liquidation protection<br>(soft liquidation)',
                softLiquidationsLabel: 'SOFT LIQUIDATIONS',
                positionsLabel: 'Positions',
                totalDebt: 'Total debt',
                averageLTV: 'Average LTV',
                positionsPerUser: 'Positions per user',
                averagePosition: 'Average position',
                protected: 'Protected',
                chain: 'Chain',
                softDebt: 'Soft Debt',
                addressPlaceholder: 'Address (0x...)',
                pageText: 'Page',
                ofPages: 'of',
                records: 'records',
                selectedPeriod: 'Selected period',
                others: 'Others',
                tokens: 'Tokens',
                platforms: 'Platforms',
                networks: 'Networks',
                value: 'Value',
                share: 'Share',
                includes: 'Includes',
                andMore: 'and {count} more'
            },
            ru: {
                title: 'Анализ защиты от ликвидаций Curve Finance',
                softLiquidations: 'Мягкие ликвидации',
                hardLiquidations: 'Жёсткие ликвидации',
                comparison: 'Сравнение',
                filters: 'Фильтры',
                platform: 'Платформа',
                allPlatforms: 'Все платформы',
                network: 'Сеть',
                allNetworks: 'Все сети',
                token: 'Токен',
                allTokens: 'Все токены',
                market: 'Маркет',
                user: 'Пользователь',
                liquidator: 'Ликвидатор',
                debt: 'Долг',
                discount: 'Дисконт',
                date: 'Дата',
                dateAndTime: 'Дата и время',
                dateFilter: 'Фильтр по дате',
                applyFilters: 'Применить фильтры',
                resetFilters: 'Сбросить',
                chartByDays: 'Анализ за период',
                day: 'День',
                week: 'Неделя',
                month: 'Месяц',
                count: 'Позиций',
                sum: 'Размер ($)',
                start: 'Начало',
                end: 'Конец',
                maxTVL: 'Max TVL',
                txHash: 'Tx Hash',
                noData: 'Нет данных',
                noEventsMatchingFilters: 'Нет событий, соответствующих фильтрам',
                noPositionsMatchingFilters: 'Нет позиций, соответствующих фильтрам',
                showing: 'Показано',
                of: 'из',
                softLiquidationsCount: 'софт ликвидаций',
                hardLiquidationsCount: 'хард ликвидаций',
                byMarkets: 'По маркетам',
                byPlatforms: 'По платформам',
                byTokens: 'По токенам',
                byNetworks: 'По сетям',
                softPositions: 'Софт позиции',
                hardEvents: 'Хард события',
                totalSoftTVL: 'Общий софт TVL',
                totalHardDebt: 'Общий хард долг',
                apply: 'Применить',
                cancel: 'Отмена',
                selectValidDate: 'Пожалуйста, выберите корректную дату',
                softLiquidationsInPositions: 'Позиции в режиме защиты от ликвидации (в софт ликвидации)',
                dateFrom: 'От',
                dateTo: 'До',
                loadingData: 'Загрузка данных...',
                averageSize: 'Средний размер',
                liquidationsPerUser: 'Ликвидаций на юзера',
                averageDiscount: 'Средний дисконт',
                softPositionsCount: 'Софт позиций',
                totalTVL: 'Общий TVL',
                debtWithoutDiscount: 'Долг без дисконта',
                debtWithDiscount: 'Долг с дисконтом',
                events: 'Событий',
                hardLiquidationsLabel: 'ХАРД ЛИКВИДАЦИИ',
                quickFilters: 'Быстрые фильтры',
                positions: 'позиций',
                protectedFromLiquidation: 'ЗАЩИЩЕНО ОТ ЛИКВИДАЦИИ',
                protectionStatus: 'Статус защиты',
                platformDistribution: 'Распределение по платформам',
                networkDistribution: 'Распределение по сетям',
                tokenDistribution: 'Распределение по токенам',
                ofTVLInSoft: 'от TVL в диапазоне защиты<br>(в софт ликвидации)',
                softLiquidationsLabel: 'СОФТ ЛИКВИДАЦИИ',
                positionsLabel: 'Позиций',
                totalDebt: 'Общий долг',
                averageLTV: 'Средний LTV',
                positionsPerUser: 'Позиций на юзера',
                averagePosition: 'Средняя позиция',
                protected: 'Защищено',
                chain: 'Сеть',
                softDebt: 'Софт долг',
                addressPlaceholder: 'Адрес (0x...)',
                pageText: 'Страница',
                ofPages: 'из',
                records: 'записей',
                selectedPeriod: 'Выбранный период',
                others: 'Остальные',
                tokens: 'Токены',
                platforms: 'Платформы',
                networks: 'Сети',
                value: 'Сумма',
                share: 'Доля',
                includes: 'Включает',
                andMore: 'и еще {count}'
            }
        };
        
        function t(key) {
            return translations[currentLang][key] || key;
        }
        
        // Функция для получения URL иконки токена через CDN
        function getTokenIconUrl(symbol) {
            if (!symbol) return null;
            
            // Нормализуем символ для поиска
            const normalizedSymbol = symbol.toUpperCase();
            
            // Используем альтернативные источники для токенов
            // Приоритет: Curve CDN -> CryptoLogos -> DeFiLlama
            const directUrls = {
                'OP': 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/optimism/info/logo.png',
                'FXN': 'https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets/0x365accfca291e7d3914637abf1f7635db165bb09.png',
                'EYWA': 'https://s2.coinmarketcap.com/static/img/coins/64x64/27566.png',
                'ETHFI': 'https://s2.coinmarketcap.com/static/img/coins/64x64/29814.png',
                'PUFETH': 'https://s2.coinmarketcap.com/static/img/coins/64x64/29690.png',
                'ARB': 'https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets-arbitrum/0x912ce59144191c1204e64559fe8253a0e49e6548.png',
                'USDE': 'https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets/0x4c9edd5852cd905f086c759e8383e09bff1e68b3.png',
                'SUSDE': 'https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets/0x9d39a5de30e57443bff2a8307a4256c8797a3497.png',
                'SQUID': 'https://s2.coinmarketcap.com/static/img/coins/64x64/11853.png',
                'UWU': 'https://s2.coinmarketcap.com/static/img/coins/64x64/28984.png',
                'YNETH': 'https://s2.coinmarketcap.com/static/img/coins/64x64/30717.png',
                'SDOLA': 'https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets/0x865377367054516e17014ccded1e7d814edc9ce4.png',
                'WEETH': 'https://s2.coinmarketcap.com/static/img/coins/64x64/28403.png',
                'EZETH': 'https://s2.coinmarketcap.com/static/img/coins/64x64/29484.png',
                'CBBTC': 'https://s2.coinmarketcap.com/static/img/coins/64x64/32049.png',
                'LBTC': 'https://s2.coinmarketcap.com/static/img/coins/64x64/33364.png',
                'DLCBTC': 'https://raw.githubusercontent.com/dlc-link/dlc-redstone-smart-contract/main/assets/dlcBTC.png',
                'IBTC': 'https://raw.githubusercontent.com/interlay/assets/master/coins/ibtc.png',
                'SFRXUSD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/31008.png',
                'SFRXETH': 'https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets/0xac3e018457b222d93114458476f3e3416abbe38f.png',
                'WFRAX': 'https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets/0x853d955acef822db058eb8505911ed77f175b99e.png',
                'ASDCRV': 'https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets/0xd533a949740bb3306d119cc777fa900ba034cd52.png',
                'USD0USD0++': 'https://raw.githubusercontent.com/usual-dao/brand-assets/main/usd0pp.png',
                'USDO+USD0++': 'https://raw.githubusercontent.com/usual-dao/brand-assets/main/usd0pp.png',
                'USD0': 'https://raw.githubusercontent.com/usual-dao/brand-assets/main/usd0.png',
                'USDO': 'https://raw.githubusercontent.com/usual-dao/brand-assets/main/usd0.png',
                'SFRAX': 'https://raw.githubusercontent.com/frax-finance/frax-assets/main/logos/sfrax.png'
            };
            
            // Проверяем прямые URL
            if (directUrls[normalizedSymbol]) {
                return directUrls[normalizedSymbol];
            }
            
            // Используем Curve CDN для основных токенов
            const tokenAddresses = {
                'ETH': '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                'WETH': '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                'WBTC': '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
                'USDT': '0xdac17f958d2ee523a2206206994597c13d831ec7',
                'USDC': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                'DAI': '0x6b175474e89094c44da98b954eedeac495271d0f',
                'CRV': '0xd533a949740bb3306d119cc777fa900ba034cd52',
                'FRAX': '0x853d955acef822db058eb8505911ed77f175b99e',
                'CRVUSD': '0xf939e0a03fb07f59a73314e73794be0e57ac1b4e',
                'TBTC': '0x18084fba666a33d37592fa2633fd49a74dd93a88',
                'STETH': '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
                'WSTETH': '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
                'MKUSD': '0x4591dbff62656e7859afe5e45f6f47d3669fbb28',
                'FXS': '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0',
                'PYUSD': '0x6c3ea9036406852006290770bedfcaba0e23a0e8'
            };
            
            const address = tokenAddresses[normalizedSymbol];
            if (address) {
                return `https://cdn.jsdelivr.net/gh/curvefi/curve-assets/images/assets/${address}.png`;
            }
            
            return null;
        }
        
        // Функция для получения URL иконки сети
        function getNetworkIconUrl(network) {
            if (!network) return null;
            
            // Нормализуем название сети - приводим к lowercase для URL
            const lowerNetwork = network.toLowerCase();
            
            // Используем альтернативные источники для иконок сетей
            // TrustWallet и другие CDN
            const networkMap = {
                'ethereum': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
                'arbitrum': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png',
                'optimism': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png',
                'polygon': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png',
                'avalanche': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png',
                'base': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png',
                'gnosis': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/xdai/info/logo.png',
                'fantom': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/info/logo.png',
                'fraxtal': 'https://s2.coinmarketcap.com/static/img/coins/64x64/29672.png',
                'bsc': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png',
                'celo': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celo/info/logo.png',
                'kava': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/kava/info/logo.png',
                'aurora': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/aurora/info/logo.png',
                'zksync': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/zksync/info/logo.png',
                'mantle': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/mantle/info/logo.png'
            };
            
            return networkMap[lowerNetwork] || null;
        }
        
        function setLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('liquidationLang', lang);
            
            // Update button classes - wait for DOM if needed
            const enBtn = document.getElementById('langEn');
            const ruBtn = document.getElementById('langRu');
            
            if (!enBtn || !ruBtn) {
                // If buttons not ready, wait and retry
                setTimeout(() => setLanguage(lang), 10);
                return;
            }
            
            if (lang === 'en') {
                enBtn.classList.add('active');
                ruBtn.classList.remove('active');
            } else {
                ruBtn.classList.add('active');
                enBtn.classList.remove('active');
            }
            
            updateUILanguage();
            renderStats();
            // Update the inline protection chart after stats are rendered
            setTimeout(() => updateProtectionChartInline(), 100);  // Add this to update stats when language changes
            renderData();
            renderChart();  // Fixed: was updateChart, should be renderChart
            updateFilters();
            updateFilterOptions();  // Update filter dropdown options when language changes
            updateFilterStats();  // Update filter stats text when language changes
        }
        
        function updateUILanguage() {
            // Update static texts
            const h1 = document.querySelector('h1');
            if (h1) {
                // Keep the image and update only the text
                h1.innerHTML = `
                    <img src="curve-logo.png" alt="Curve Logo" style="height: 40px; width: auto;">
                    ${t('title')}
                `;
            }
            const chartTitle = document.querySelector('#chartTitle');
            if (chartTitle) chartTitle.textContent = t('chartByDays');
            
            // Обновляем формат дат при смене языка, но не меняем сами даты
            const startLabel = document.querySelector('#startLabel');
            const endLabel = document.querySelector('#endLabel');
            const locale = currentLang === 'en' ? 'en-US' : 'ru-RU';
            
            if (startLabel && selectedStartDate) {
                startLabel.textContent = selectedStartDate.toLocaleDateString(locale, {day: 'numeric', month: 'short', year: '2-digit'});
            }
            if (endLabel && selectedEndDate) {
                endLabel.textContent = selectedEndDate.toLocaleDateString(locale, {day: 'numeric', month: 'short', year: '2-digit'});
            }
            
            // Update chart period labels
            const dayLabel = document.querySelector('#dayLabel');
            if (dayLabel) dayLabel.textContent = t('day');
            const weekLabel = document.querySelector('#weekLabel');
            if (weekLabel) weekLabel.textContent = t('week');
            const monthLabel = document.querySelector('#monthLabel');
            if (monthLabel) monthLabel.textContent = t('month');
            
            // Update filter labels
            const platformLabel = document.querySelector('#platformLabel');
            if (platformLabel) platformLabel.textContent = t('platform');
            const networkLabel = document.querySelector('#networkLabel');
            if (networkLabel) networkLabel.textContent = t('network');
            const tokenLabel = document.querySelector('#tokenLabel');
            if (tokenLabel) tokenLabel.textContent = t('token');
            const userLabel = document.querySelector('#userLabel');
            if (userLabel) userLabel.textContent = t('user');
            
            // Update filter texts
            const filterTitle = document.querySelector('#filterTitle');
            if (filterTitle) filterTitle.textContent = `${t('filters')}:`;
            const applyBtn = document.querySelector('#applyFiltersBtn');
            if (applyBtn) applyBtn.textContent = t('apply');
            const resetBtn = document.querySelector('#resetFiltersBtn');
            if (resetBtn) resetBtn.textContent = t('resetFilters').replace('Filters', '');
            
            // Update platform filter
            const allPlatformsOption = document.querySelector('#allPlatformsOption');
            if (allPlatformsOption) allPlatformsOption.textContent = t('allPlatforms');
            
            // Update address placeholder
            const addressFilter = document.querySelector('#addressFilter');
            if (addressFilter) addressFilter.placeholder = t('addressPlaceholder');
            const allNetworks = document.querySelector('#allNetworksOption');
            if (allNetworks) allNetworks.textContent = t('allNetworks');
            const allTokens = document.querySelector('#allTokensOption');
            if (allTokens) allTokens.textContent = t('allTokens');
            
            // Update selected period label
            const selectedPeriodLabel = document.querySelector('#selectedPeriodLabel');
            if (selectedPeriodLabel) selectedPeriodLabel.textContent = t('selectedPeriod');
            
            // Update distribution chart buttons
            // Update both sets of buttons
            const tokenBtnText = document.querySelector('#tokenBtnText');
            if (tokenBtnText) tokenBtnText.textContent = t('tokens');
            const tokenBtnText2 = document.querySelector('#tokenBtnText2');
            if (tokenBtnText2) tokenBtnText2.textContent = t('tokens');
            
            const platformBtnText = document.querySelector('#platformBtnText');
            if (platformBtnText) platformBtnText.textContent = t('platforms');
            const platformBtnText2 = document.querySelector('#platformBtnText2');
            if (platformBtnText2) platformBtnText2.textContent = t('platforms');
            
            const networkBtnText = document.querySelector('#networkBtnText');
            if (networkBtnText) networkBtnText.textContent = t('networks');
            const networkBtnText2 = document.querySelector('#networkBtnText2');
            if (networkBtnText2) networkBtnText2.textContent = t('networks');
            
            // Update main date filter
            const mainDateFilterBtn = document.querySelector('#mainDateFilterBtn');
            if (mainDateFilterBtn) mainDateFilterBtn.innerHTML = t('dateFilter');
            const mainDateFromLabel = document.querySelector('#mainDateFromLabel');
            if (mainDateFromLabel) mainDateFromLabel.textContent = `${t('dateFrom')}:`;
            const mainDateToLabel = document.querySelector('#mainDateToLabel');
            if (mainDateToLabel) mainDateToLabel.textContent = `${t('dateTo')}:`;
            const mainApplyBtn = document.querySelector('#mainApplyBtn');
            if (mainApplyBtn) mainApplyBtn.textContent = t('apply');
            const mainCancelBtn = document.querySelector('#mainCancelBtn');
            if (mainCancelBtn) mainCancelBtn.textContent = t('cancel');
            
            // Update tabs
            document.querySelectorAll('.tab').forEach(tab => {
                const tabType = tab.dataset.tab;
                if (tabType === 'soft') tab.innerHTML = t('softLiquidations');
                if (tabType === 'hard') tab.innerHTML = t('hardLiquidations');
                if (tabType === 'comparison') tab.innerHTML = t('comparison');
            });
            
            // Update legend
            const legendItems = document.querySelectorAll('.legend-item span');
            if (legendItems[0]) legendItems[0].textContent = t('softLiquidations');
            if (legendItems[1]) legendItems[1].textContent = t('hardLiquidations');
            
            // Update radio buttons for chart mode
            const countLabel = document.getElementById('countLabel');
            const sumLabel = document.getElementById('sumLabel');
            if (countLabel) countLabel.textContent = t('count');
            if (sumLabel) sumLabel.textContent = t('sum');
            
            // Update loading text
            const loadingEl = document.querySelector('#loadingText');
            if (loadingEl) loadingEl.textContent = t('loadingData');
        }
        
        function updateFilters() {
            // This function is called when language changes to update filter options
            updateUILanguage();
        }
        
        let softData = null;
        let hardData = null;
        let filteredSoftData = null;
        let filteredHardData = null;
        let currentTab = 'comparison';
        let currentPage = 1;
        const itemsPerPage = 50;
        let availableNetworks = new Set();
        let availableTokens = new Set();
        let sortColumn = 'first_dt'; // По умолчанию сортируем по дате входа
        let sortDirection = 'desc'; // По умолчанию новые сначала
        let hardSortColumn = 'timestamp'; // Сортировка для хард ликвидаций
        let hardSortDirection = 'desc';
        let compareSortColumn = 'softTVL'; // Сортировка для сравнения
        let compareSortDirection = 'desc';
        
        // Глобальные переменные для хранения выбранных дат
        let selectedStartDate = null;
        let selectedEndDate = null;
        let globalMinDate = null;
        let globalMaxDate = null;
        let chartMode = 'sum'; // 'count' или 'sum'
        let chartPeriod = 'month'; // 'day', 'week', 'month'
        let comparisonGroupBy = 'market'; // 'market', 'platform', 'token', 'chain'
        let tableDateStart = null; // Начальная дата для фильтрации таблиц
        let tableDateEnd = null; // Конечная дата для фильтрации таблиц

        // Удален обработчик выбора файла - автозагрузка из latest_liquidations.js

        // Обработка вкладок
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                currentTab = e.target.dataset.tab;
                currentPage = 1;
                renderData();
            });
        });
        
        // Обработка переключения режима графика
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize language buttons
            setLanguage(currentLang);
            
            document.querySelectorAll('input[name="chartMode"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    chartMode = e.target.value;
                    renderChart();
                    // Also update distribution chart
                    updateDistributionCharts();
                });
            });
            
            // Обработчик для периода графика
            document.querySelectorAll('input[name="chartPeriod"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    chartPeriod = e.target.value;
                    renderChart();
                });
            });

            // Обработчик для типа диаграммы распределения
            document.querySelectorAll('input[name="distributionType"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    switchDistributionChart(e.target.value);
                });
            });
            
            // Закрытие календаря при клике вне его
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.date-range-picker') && !e.target.closest('.calendar-icon')) {
                    document.querySelectorAll('.date-range-picker').forEach(picker => {
                        picker.classList.remove('active');
                    });
                }
            });
        });

        async function loadFile(file) {
            try {
                const text = await file.text();
                
                // Извлекаем JSON из JSONP
                const jsonMatch = text.match(/window\.\w+\s*=\s*({[\s\S]*});?\s*$/);
                if (!jsonMatch) {
                    throw new Error('Неверный формат JSONP файла');
                }
                
                const data = JSON.parse(jsonMatch[1]);
                processLoadedData(data);
            } catch (error) {
                showError(`Ошибка загрузки файла: ${error.message}`);
            }
        }

        async function loadScriptByName(fileName) {
            return new Promise((resolve, reject) => {
                // Удаляем старый скрипт если есть
                const oldScript = document.getElementById('dataScript');
                if (oldScript) {
                    oldScript.remove();
                }
                
                const script = document.createElement('script');
                script.id = 'dataScript';
                script.src = fileName + '?t=' + Date.now(); // Добавляем timestamp для обхода кеша
                script.onload = resolve;
                script.onerror = () => reject(new Error('Не удалось загрузить файл'));
                document.body.appendChild(script);
            });
        }

        // Предварительно обработанные данные для быстрого доступа
        let preprocessedData = {
            dailyPositions: {}, // Позиции активные в каждый день
            weeklyPositions: {}, // Позиции активные в каждую неделю
            monthlyPositions: {}, // Позиции активные в каждый месяц
            dailyEvents: {}, // События по дням
            weeklyEvents: {}, // События по неделям
            monthlyEvents: {}, // События по месяцам
            minDate: null,
            maxDate: null
        };
        
        // Функция предварительной обработки данных
        function preprocessData() {
            const startTime = performance.now();
            
            // Находим диапазон дат
            let minDate = new Date('2100-01-01');
            let maxDate = new Date('2000-01-01');
            
            // Обрабатываем софт ликвидации
            if (softData && softData.positions) {
                softData.positions.forEach(pos => {
                    if (pos.first_dt) {
                        const openDate = new Date(pos.first_dt);
                        const closeDate = pos.last_dt ? new Date(pos.last_dt) : new Date();
                        
                        if (openDate < minDate) minDate = openDate;
                        if (closeDate > maxDate) maxDate = closeDate;
                        
                        // Предварительно вычисляем TVL
                        pos.cachedTVL = parseFloat(pos.tvl || pos.collateral_usd || 0);
                    }
                });
            }
            
            // Обрабатываем хард ликвидации
            if (hardData && hardData.events) {
                hardData.events.forEach(event => {
                    if (event.timestamp) {
                        const date = new Date(event.timestamp);
                        if (date < minDate) minDate = date;
                        if (date > maxDate) maxDate = date;
                        
                        // Предварительно вычисляем debt
                        event.cachedDebt = parseFloat(event.debt_with_discount || event.debt || 0);
                    }
                });
            }
            
            preprocessedData.minDate = minDate;
            preprocessedData.maxDate = maxDate;
            
            // Создаём индексы по дням
            const currentDate = new Date(minDate);
            while (currentDate <= maxDate) {
                const dayKey = currentDate.toISOString().split('T')[0];
                preprocessedData.dailyPositions[dayKey] = [];
                preprocessedData.dailyEvents[dayKey] = [];
                currentDate.setDate(currentDate.getDate() + 1);
            }
            
            // Заполняем индексы позициями
            if (softData && softData.positions) {
                softData.positions.forEach((pos, index) => {
                    if (pos.first_dt) {
                        const openDate = new Date(pos.first_dt);
                        const closeDate = pos.last_dt ? new Date(pos.last_dt) : maxDate;
                        
                        // Добавляем позицию во все дни когда она была активна
                        let currentDate = new Date(openDate);
                        while (currentDate <= closeDate) {
                            const dayKey = currentDate.toISOString().split('T')[0];
                            if (preprocessedData.dailyPositions[dayKey]) {
                                preprocessedData.dailyPositions[dayKey].push(index);
                            }
                            currentDate.setDate(currentDate.getDate() + 1);
                        }
                    }
                });
            }
            
            // Заполняем индексы событиями
            if (hardData && hardData.events) {
                hardData.events.forEach((event, index) => {
                    if (event.timestamp) {
                        const date = new Date(event.timestamp);
                        const dayKey = date.toISOString().split('T')[0];
                        if (preprocessedData.dailyEvents[dayKey]) {
                            preprocessedData.dailyEvents[dayKey].push(index);
                        }
                    }
                });
            }
            
            const endTime = performance.now();
        }

        function processLoadedData(data) {
            softData = data.soft_liquidations;
            hardData = data.hard_liquidations;
            
            // Initialize filtered data to be the same as original data
            filteredSoftData = softData;
            filteredHardData = hardData;
            
            // Предварительная обработка данных для оптимизации
            preprocessData();
            
            // Находим полный диапазон данных
            let minDate = new Date();
            let maxDate = new Date(0);
            
            // Собираем доступные сети и токены
            availableNetworks.clear();
            availableTokens.clear();
            
            // Из софт ликвидаций
            if (softData && softData.positions) {
                softData.positions.forEach(pos => {
                    if (pos.chain) availableNetworks.add(pos.chain);
                    if (pos.collateral_token) availableTokens.add(pos.collateral_token);
                    if (pos.first_dt) {
                        const date = new Date(pos.first_dt);
                        if (date < minDate) minDate = date;
                        if (date > maxDate) maxDate = date;
                    }
                });
            }
            
            // Из хард ликвидаций
            if (hardData && hardData.events) {
                hardData.events.forEach(event => {
                    if (event.chain) availableNetworks.add(event.chain);
                    if (event.collateral_token) availableTokens.add(event.collateral_token);
                    if (event.timestamp) {
                        const date = new Date(event.timestamp);
                        if (date < minDate) minDate = date;
                        if (date > maxDate) maxDate = date;
                    }
                });
            }
            
            // Сохраняем глобальные даты
            globalMinDate = minDate;
            globalMaxDate = maxDate;
            
            // Устанавливаем диапазон ползунков на весь период данных
            const totalDays = Math.ceil((maxDate - minDate) / (24 * 60 * 60 * 1000));
            const rangeStart = document.getElementById('rangeStart');
            const rangeEnd = document.getElementById('rangeEnd');
            const sliderRange = document.getElementById('sliderRange');
            
            // Устанавливаем максимум на полный диапазон данных
            rangeStart.max = totalDays;
            rangeEnd.max = totalDays;
            rangeStart.value = 0; // Начало с первого дня
            rangeEnd.value = totalDays; // Конец на последней дате
            
            // Обновляем визуальный диапазон
            const startPercent = 0;
            const endPercent = 100;
            sliderRange.style.left = startPercent + '%';
            sliderRange.style.width = endPercent + '%';
            
            // Устанавливаем начальные выбранные даты на весь диапазон
            selectedStartDate = minDate;
            selectedEndDate = maxDate;
            
            // Обновляем метки
            const locale = currentLang === 'en' ? 'en-US' : 'ru-RU';
            document.getElementById('startLabel').textContent = selectedStartDate.toLocaleDateString(locale, {day: 'numeric', month: 'short', year: '2-digit'});
            document.getElementById('endLabel').textContent = selectedEndDate.toLocaleDateString(locale, {day: 'numeric', month: 'short', year: '2-digit'});
            
            // Обрабатываем и отображаем данные (this will create the filter elements in the stats grid)
            processData();
            
            // Initialize language UI and update filter options after elements are created
            setTimeout(() => {
                updateUILanguage();
                updateFilterOptions();
                
                // Force update dropdowns again after a delay to ensure they're populated
                setTimeout(() => {
                    updateFilterOptions();
                }, 100);
            }, 20);
            
            // Применяем фильтры после того как элементы созданы
            setTimeout(() => {
                applyFilters();
            }, 150);
            
            // Force update filter stats with current language and date range
            setTimeout(() => {
                updateFilterStats();
                updateProtectionChart();
            }, 100);
            
            // Final attempt to populate dropdowns after everything is ready
            setTimeout(() => {
                updateFilterOptions();
            }, 500);
        }

        function updateFilterOptions() {
            // Function to try updating filters with retries
            let retryCount = 0;
            const maxRetries = 10;
            
            function tryUpdate() {
                // Обновляем сети
                const networkFilter = document.getElementById('networkFilter');
                const tokenFilter = document.getElementById('tokenFilter');
                
                let networkUpdated = false;
                let tokenUpdated = false;
                
                if (networkFilter && availableNetworks.size > 0) {
                    // Check if already populated
                    if (networkFilter.options.length <= 1) {
                        networkFilter.innerHTML = `<option value="" id="allNetworksOption">${t('allNetworks')}</option>`;
                        Array.from(availableNetworks).sort().forEach(network => {
                            const option = document.createElement('option');
                            option.value = network;
                            option.textContent = network;
                            networkFilter.appendChild(option);
                        });
                    } else if (networkFilter.options[0]) {
                        // Update existing first option text
                        networkFilter.options[0].textContent = t('allNetworks');
                    }
                    networkUpdated = true;
                }
                
                // Обновляем токены
                if (tokenFilter && availableTokens.size > 0) {
                    // Check if already populated
                    if (tokenFilter.options.length <= 1) {
                        tokenFilter.innerHTML = `<option value="" id="allTokensOption">${t('allTokens')}</option>`;
                        Array.from(availableTokens).sort().forEach(token => {
                            const option = document.createElement('option');
                            option.value = token;
                            option.textContent = token;
                            tokenFilter.appendChild(option);
                        });
                    } else if (tokenFilter.options[0]) {
                        // Update existing first option text
                        tokenFilter.options[0].textContent = t('allTokens');
                    }
                    tokenUpdated = true;
                }
                
                // Retry if not successful and under retry limit
                if ((!networkUpdated || !tokenUpdated) && retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(tryUpdate, 200);
                }
            }
            
            tryUpdate();
        }
        
        // Helper functions for calculating summaries
        function calculateSoftSummary(positions) {
            if (!positions || positions.length === 0) {
                return {
                    total_positions: 0,
                    total_tvl: 0,
                    total_debt: 0,
                    llamalend_positions: 0,
                    llamalend_tvl: 0,
                    llamalend_debt: 0,
                    crvusd_positions: 0,
                    crvusd_tvl: 0,
                    crvusd_debt: 0
                };
            }
            
            const summary = {
                total_positions: positions.length,
                total_tvl: 0,
                total_debt: 0,
                llamalend_positions: 0,
                llamalend_tvl: 0,
                llamalend_debt: 0,
                crvusd_positions: 0,
                crvusd_tvl: 0,
                crvusd_debt: 0
            };
            
            positions.forEach(pos => {
                const tvl = parseFloat(pos.tvl || pos.collateral_usd || 0);
                const debt = parseFloat(pos.debt || 0);
                
                summary.total_tvl += tvl;
                summary.total_debt += debt;
                
                if (pos.platform === 'LlamaLend') {
                    summary.llamalend_positions++;
                    summary.llamalend_tvl += tvl;
                    summary.llamalend_debt += debt;
                } else if (pos.platform === 'crvUSD') {
                    summary.crvusd_positions++;
                    summary.crvusd_tvl += tvl;
                    summary.crvusd_debt += debt;
                }
            });
            
            return summary;
        }
        
        function calculateHardTotal(events) {
            if (!events || events.length === 0) {
                return {
                    count: 0,
                    debt: 0,
                    debt_with_discount: 0
                };
            }
            
            const total = {
                count: events.length,
                debt: 0,
                debt_with_discount: 0
            };
            
            events.forEach(event => {
                const debt = parseFloat(event.debt || 0);
                total.debt += debt;
                // Используем готовое значение debt_with_discount из JSON
                total.debt_with_discount += parseFloat(event.debt_with_discount || event.debt || 0);
            });
            
            return total;
        }

        window.switchTab = function(tab) {
            currentTab = tab;
            
            // Update main tabs
            const tabs = document.querySelectorAll('.tabs .tab');
            tabs.forEach(t => {
                t.classList.remove('active');
                if (t.dataset.tab === tab) {
                    t.classList.add('active');
                }
            });
            
            // Update tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tab}Tab`) {
                    content.classList.add('active');
                }
            });
            
            // Update stats and re-render data
            renderStats();
            renderData();
        }
        
        window.applyFilters = function() {
            const typeFilter = 'all'; // Убрали фильтр по типу
            
            const platformFilter = document.getElementById('platformFilter');
            const networkFilter = document.getElementById('networkFilter');
            const tokenFilter = document.getElementById('tokenFilter');
            const addressFilterEl = document.getElementById('addressFilter');
            
            // Сохраняем текущие значения фильтров перед пересозданием
            const platformFilterValue = platformFilter ? platformFilter.value : '';
            const networkFilterValue = networkFilter ? networkFilter.value : '';
            const tokenFilterValue = tokenFilter ? tokenFilter.value : '';
            const addressFilter = addressFilterEl ? addressFilterEl.value.toLowerCase() : '';
            
            // Сохраняем значения глобально для восстановления после renderStats
            window.savedFilterValues = {
                platform: platformFilterValue,
                network: networkFilterValue,
                token: tokenFilterValue,
                address: addressFilterEl ? addressFilterEl.value : ''
            };
            
            // Фильтруем софт ликвидации
            if (softData && softData.positions) {
                filteredSoftData = {
                    ...softData,
                    positions: softData.positions.filter(pos => {
                        if (platformFilterValue && platformFilterValue !== '' && pos.platform !== platformFilterValue) return false;
                        if (networkFilterValue && networkFilterValue !== '' && pos.chain !== networkFilterValue) return false;
                        if (tokenFilterValue && tokenFilterValue !== '' && pos.collateral_token.toLowerCase() !== tokenFilterValue.toLowerCase()) return false;
                        if (addressFilter && !pos.user.toLowerCase().includes(addressFilter)) return false;
                        return true;
                    })
                };
                
                // Recalculate summary for filtered data
                filteredSoftData.summary = calculateSoftSummary(filteredSoftData.positions);
                
                // Keep original summary if it exists and we haven't calculated a new one
                if (!filteredSoftData.summary.total_positions && softData.summary) {
                    filteredSoftData.summary = softData.summary;
                }
            }
            
            // Фильтруем хард ликвидации
            if (hardData && hardData.events) {
                filteredHardData = {
                    ...hardData,
                    events: hardData.events.filter(event => {
                        if (platformFilterValue && platformFilterValue !== '' && event.platform !== platformFilterValue) return false;
                        if (networkFilterValue && networkFilterValue !== '' && event.chain !== networkFilterValue) return false;
                        if (tokenFilterValue && tokenFilterValue !== '' && event.collateral_token.toLowerCase() !== tokenFilterValue.toLowerCase()) return false;
                        if (addressFilter && !event.user.toLowerCase().includes(addressFilter) && 
                            !event.liquidator.toLowerCase().includes(addressFilter)) return false;
                        return true;
                    })
                };
                
                // Recalculate total for filtered data
                filteredHardData.total = calculateHardTotal(filteredHardData.events);
                
                // Keep original total if it exists and we haven't calculated a new one
                if (!filteredHardData.total.count && hardData.total) {
                    filteredHardData.total = hardData.total;
                }
            }
            
            // Update inline protection chart
            setTimeout(() => updateProtectionChartInline(), 100);
            
            // Обновляем статистику фильтров
            setTimeout(() => updateFilterStats(), 0);  // Defer to ensure DOM is ready
            
            // Сбрасываем на первую страницу
            currentPage = 1;
            
            // Применяем фильтр типа к текущей вкладке
            if (typeFilter === 'soft') {
                currentTab = 'soft';
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelector('[data-tab="soft"]').classList.add('active');
            } else if (typeFilter === 'hard') {
                currentTab = 'hard';
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelector('[data-tab="hard"]').classList.add('active');
            }
            
            // Обновляем статистику, диаграмму и данные
            renderStats();
            // Update the inline protection chart after stats are rendered
            setTimeout(() => updateProtectionChartInline(), 100);
            
            // Обновляем диапазон слайдера при фильтрации, но сохраняем выбранные даты
            if (filteredSoftData && filteredHardData) {
                let minDate = new Date();
                let maxDate = new Date(0);
                
                // Находим новый диапазон дат в отфильтрованных данных
                if (filteredSoftData.positions) {
                    filteredSoftData.positions.forEach(pos => {
                        if (pos.first_dt) {
                            const date = new Date(pos.first_dt);
                            if (date < minDate) minDate = date;
                            if (date > maxDate) maxDate = date;
                        }
                    });
                }
                
                if (filteredHardData.events) {
                    filteredHardData.events.forEach(event => {
                        if (event.timestamp) {
                            const date = new Date(event.timestamp);
                            if (date < minDate) minDate = date;
                            if (date > maxDate) maxDate = date;
                        }
                    });
                }
                
                // Если отфильтрованных данных нет, используем глобальный диапазон
                if (minDate > maxDate) {
                    minDate = globalMinDate;
                    maxDate = globalMaxDate;
                }
                
                // Обновляем слайдеры
                const totalDays = Math.ceil((maxDate - minDate) / (24 * 60 * 60 * 1000)) + 1;
                const rangeStart = document.getElementById('rangeStart');
                const rangeEnd = document.getElementById('rangeEnd');
                const sliderRange = document.getElementById('sliderRange');
                
                rangeStart.max = totalDays;
                rangeEnd.max = totalDays;
                
                // Пересчитываем позиции слайдера на основе сохраненных дат
                // Если выбранные даты выходят за пределы нового диапазона, корректируем их
                let newStartDate = selectedStartDate;
                let newEndDate = selectedEndDate;
                
                if (newStartDate < minDate) newStartDate = minDate;
                if (newEndDate > maxDate) newEndDate = maxDate;
                if (newStartDate > maxDate) newStartDate = new Date(maxDate.getTime() - 30 * 24 * 60 * 60 * 1000);
                if (newEndDate < minDate) newEndDate = minDate;
                
                // Конвертируем даты обратно в значения слайдера
                const startValue = Math.max(0, Math.floor((newStartDate - minDate) / (24 * 60 * 60 * 1000)));
                const endValue = Math.min(totalDays, Math.ceil((newEndDate - minDate) / (24 * 60 * 60 * 1000)));
                
                rangeStart.value = startValue;
                rangeEnd.value = endValue;
                
                // Обновляем визуальный диапазон
                const startPercent = (rangeStart.value / rangeEnd.max) * 100;
                const endPercent = (rangeEnd.value / rangeEnd.max) * 100;
                sliderRange.style.left = startPercent + '%';
                sliderRange.style.width = (endPercent - startPercent) + '%';
                
                // Обновляем метки
                const locale = currentLang === 'en' ? 'en-US' : 'ru-RU';
                document.getElementById('startLabel').textContent = newStartDate.toLocaleDateString(locale, {day: 'numeric', month: 'short', year: '2-digit'});
                document.getElementById('endLabel').textContent = newEndDate.toLocaleDateString(locale, {day: 'numeric', month: 'short', year: '2-digit'});
            }
            
            renderChart();
            renderData();
        }

        function updateFilterStats() {
            // This function is no longer needed as we removed the filter stats display
            // Keeping it as empty function to avoid breaking existing calls
        }

        function resetFilters() {
            // Clear saved filter values
            window.savedFilterValues = {
                platform: '',
                network: '',
                token: '',
                address: ''
            };
            
            // Clear filter elements
            document.getElementById('platformFilter').value = '';
            document.getElementById('networkFilter').value = '';
            document.getElementById('tokenFilter').value = '';
            document.getElementById('addressFilter').value = '';
            
            applyFilters();
        }

        function processData() {
            renderStats();
            // Update the inline protection chart after stats are rendered
            setTimeout(() => updateProtectionChartInline(), 100);
            renderChart();
            renderData();
            updateFilterStats();  // Ensure filter stats are updated after data loads
            updateProtectionChart();  // Update protection chart
        }
        
        function renderChart() {
            const chartContainer = document.getElementById('liquidationChart');
            
            // Используем отфильтрованные данные если они есть, иначе полные
            let softDataToUse = filteredSoftData || softData;
            let hardDataToUse = filteredHardData || hardData;
            
            // Если выбран конкретный диапазон дат через слайдеры, фильтруем данные по датам
            // чтобы график использовал те же данные, что и верхняя карточка
            if (selectedStartDate && selectedEndDate) {
                if (softDataToUse?.positions) {
                    const filteredPositions = softDataToUse.positions.filter(pos => {
                        if (!pos.first_dt) return false;
                        const openDate = new Date(pos.first_dt);
                        const closeDate = pos.last_dt ? new Date(pos.last_dt) : new Date();
                        
                        // Позиция активна если пересекается с выбранным периодом
                        return openDate <= selectedEndDate && closeDate >= selectedStartDate;
                    });
                    
                    softDataToUse = {
                        ...softDataToUse,
                        positions: filteredPositions
                    };
                }
                
                if (hardDataToUse?.events) {
                    const filteredEvents = hardDataToUse.events.filter(event => {
                        if (!event.timestamp) return false;
                        const date = new Date(event.timestamp);
                        return date >= selectedStartDate && date <= selectedEndDate;
                    });
                    
                    hardDataToUse = {
                        ...hardDataToUse,
                        events: filteredEvents
                    };
                }
            }
            
            
            if (!softDataToUse || !hardDataToUse) {
                chartContainer.innerHTML = `<div style="text-align: center; padding: 40px; color: #666;">${t('noData')}</div>`;
                return;
            }
            
            // Определяем диапазон дат
            let startDate, endDate;
            
            // Находим минимальную и максимальную даты в ОТФИЛЬТРОВАННЫХ данных
            let minDate = new Date();
            let maxDate = new Date(0);
            
            if (softDataToUse.positions) {
                softDataToUse.positions.forEach(pos => {
                    if (pos.first_dt) {
                        const date = new Date(pos.first_dt);
                        if (date < minDate) minDate = date;
                        if (date > maxDate) maxDate = date;
                    }
                });
            }
            
            if (hardDataToUse.events) {
                hardDataToUse.events.forEach(event => {
                    if (event.timestamp) {
                        const date = new Date(event.timestamp);
                        if (date < minDate) minDate = date;
                        if (date > maxDate) maxDate = date;
                    }
                });
            }
            
            // Используем сохраненные даты если они есть
            if (selectedStartDate && selectedEndDate) {
                startDate = selectedStartDate;
                endDate = selectedEndDate;
            } else {
                // Если нет сохраненных дат, используем значения слайдеров
                const rangeStart = document.getElementById('rangeStart');
                const rangeEnd = document.getElementById('rangeEnd');
                const startDaysFromMin = parseInt(rangeStart.value) || 0;
                const endDaysFromMin = parseInt(rangeEnd.value) || 30;
                
                startDate = new Date(minDate.getTime() + startDaysFromMin * 24 * 60 * 60 * 1000);
                endDate = new Date(minDate.getTime() + endDaysFromMin * 24 * 60 * 60 * 1000);
            }
            
            // Если запрошенный диапазон больше доступных данных
            if (startDate < minDate) {
                startDate = minDate;
            }
            
            // Обновляем заголовок
            const title = document.getElementById('chartTitle');
            const locale = currentLang === 'en' ? 'en-US' : 'ru-RU';
            const startStr = startDate.toLocaleDateString(locale);
            const endStr = endDate.toLocaleDateString(locale);
            const dateRange = `${startStr} - ${endStr}`;
            title.textContent = `${t('chartByDays')} (${dateRange})`;
            
            // Подготавливаем данные по периодам
            const periodData = {};
            
            // Функция для получения ключа периода
            function getPeriodKey(date, period = chartPeriod) {
                if (period === 'day') {
                    return date.toISOString().split('T')[0];
                } else if (period === 'week') {
                    // Начало недели (понедельник)
                    const weekStart = new Date(date);
                    const day = weekStart.getDay();
                    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
                    weekStart.setDate(diff);
                    return weekStart.toISOString().split('T')[0];
                } else if (period === 'month') {
                    // Начало месяца
                    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
                }
            }
            
            // Инициализируем периоды
            let actualPeriod = chartPeriod; // Локальная переменная для этого вызова
            
            if (actualPeriod === 'day') {
                const totalDays = Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1;
                
                // Инициализируем все дни
                for (let i = 0; i < totalDays; i++) {
                    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
                    const key = getPeriodKey(date, actualPeriod);
                    if (!periodData[key]) {
                        periodData[key] = { soft: 0, hard: 0, softTVL: 0, hardDebt: 0, date: date };
                    }
                }
            } else if (actualPeriod === 'week') {
                // Создаем периоды по неделям
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    const key = getPeriodKey(currentDate, actualPeriod);
                    if (!periodData[key]) {
                        periodData[key] = { soft: 0, hard: 0, softTVL: 0, hardDebt: 0, date: new Date(key) };
                    }
                    currentDate.setDate(currentDate.getDate() + 7);
                }
            } else if (actualPeriod === 'month') {
                // Создаем периоды по месяцам
                let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
                const endMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
                while (currentDate <= endMonth) {
                    const key = getPeriodKey(currentDate, actualPeriod);
                    if (!periodData[key]) {
                        periodData[key] = { soft: 0, hard: 0, softTVL: 0, hardDebt: 0, date: new Date(key) };
                    }
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
            }
            
            // Считаем софт ликвидации
            // Не используем предобработанные данные, так как они не учитывают фильтрацию по датам
            if (softDataToUse.positions) {
                // Обрабатываем все периоды одинаково
                softDataToUse.positions.forEach(pos => {
                    if (!pos.first_dt) return;
                    
                    const openDate = new Date(pos.first_dt);
                    const closeDate = pos.last_dt ? new Date(pos.last_dt) : new Date();
                    const tvl = pos.cachedTVL || parseFloat(pos.tvl || pos.collateral_usd || 0);
                    
                    // Пропускаем позиции вне диапазона
                    if (closeDate < startDate || openDate > endDate) {
                        return;
                    }
                    
                    Object.keys(periodData).forEach(periodKey => {
                        const periodDate = new Date(periodKey);
                        let periodEnd;
                        
                        if (actualPeriod === 'week') {
                            periodEnd = new Date(periodDate);
                            periodEnd.setDate(periodEnd.getDate() + 7);
                        } else if (actualPeriod === 'month') {
                            periodEnd = new Date(periodDate.getFullYear(), periodDate.getMonth() + 1, 1);
                        } else { // day
                            periodEnd = new Date(periodDate);
                            periodEnd.setDate(periodEnd.getDate() + 1);
                        }
                        
                        // Позиция активна если была открыта до конца периода И закрыта после начала периода
                        if (openDate < periodEnd && closeDate >= periodDate) {
                            periodData[periodKey].soft++;
                            periodData[periodKey].softTVL += tvl;
                        }
                    });
                });
            }
            
            
            // Считаем хард ликвидации
            if (hardDataToUse.events) {
                // Всегда используем прямой подсчет для корректной работы с фильтрами
                hardDataToUse.events.forEach(event => {
                    if (event.timestamp) {
                        const date = new Date(event.timestamp);
                        if (date >= startDate && date <= endDate) {
                            const key = getPeriodKey(date, actualPeriod);
                            if (periodData[key]) {
                                periodData[key].hard++;
                                periodData[key].hardDebt += event.cachedDebt || parseFloat(event.debt_with_discount || event.debt || 0);
                            }
                        }
                    }
                });
            }
            
            // Находим максимальные значения в зависимости от режима
            let maxSoft = 0;
            let maxHard = 0;
            let totalChartSoftTVL = 0;
            let totalChartHardDebt = 0;
            let maxPeriodSoftTVL = 0;
            let maxPeriodHardDebt = 0;
            Object.values(periodData).forEach(period => {
                if (chartMode === 'sum') {
                    maxSoft = Math.max(maxSoft, period.softTVL);
                    maxHard = Math.max(maxHard, period.hardDebt);
                    // Для отладки: находим максимальные значения одного периода
                    maxPeriodSoftTVL = Math.max(maxPeriodSoftTVL, period.softTVL);
                    maxPeriodHardDebt = Math.max(maxPeriodHardDebt, period.hardDebt);
                    // И суммируем все хард долги (они не пересекаются)
                    totalChartHardDebt += period.hardDebt;
                } else {
                    maxSoft = Math.max(maxSoft, period.soft);
                    maxHard = Math.max(maxHard, period.hard);
                }
            });
            
            const maxValue = Math.max(maxSoft, maxHard);
            
            // Рисуем диаграмму
            let html = '';
            
            // Добавляем легенду в верхний правый угол графика
            const theme = localStorage.getItem('theme') || 'light';
            let softColor = '#2196F3';
            let hardColor = '#90CAF9';
            
            if (theme === 'chad') {
                softColor = '#6b46c1';
                hardColor = '#9171d8';
            }
            
            html += `
                <div class="chart-legend-box" style="position: absolute; top: 5px; right: 5px; padding: 8px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10; font-size: 12px;">
                    <div style="display: flex; align-items: center; margin-bottom: 4px;">
                        <div style="width: 12px; height: 12px; background: ${softColor}; border-radius: 0; margin-right: 6px;"></div>
                        <span>${t('softLiquidations')}</span>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <div style="width: 12px; height: 12px; background: ${hardColor}; border-radius: 0; margin-right: 6px;"></div>
                        <span>${t('hardLiquidations')}</span>
                    </div>
                </div>
            `;
            
            // Добавляем Y-ось (вертикальную шкалу)
            html += '<div class="chart-y-axis">';
            const ySteps = 5; // Количество делений на Y-оси
            for (let i = 0; i <= ySteps; i++) {
                const value = (maxValue * i) / ySteps;
                let label;
                if (chartMode === 'sum') {
                    // Форматируем сумму в доллары
                    if (value >= 1000000) {
                        label = `$${(value / 1000000).toFixed(1)}M`;
                    } else if (value >= 1000) {
                        label = `$${(value / 1000).toFixed(0)}K`;
                    } else {
                        label = `$${value.toFixed(0)}`;
                    }
                } else {
                    // Для количества просто число
                    label = value.toFixed(0);
                }
                html += `<div class="chart-y-label">${label}</div>`;
            }
            html += '</div>';
            
            // Добавляем контейнер для баров с отступом слева для Y-оси
            html += '<div style="position: absolute; left: 50px; right: 0; top: 0; bottom: 30px;">';
            
            const dates = Object.keys(periodData).sort();
            const barWidth = Math.min(100 / dates.length, actualPeriod === 'month' ? 8 : actualPeriod === 'week' ? 4 : 2);
            
            dates.forEach((dateStr, index) => {
                const period = periodData[dateStr];
                let softValue, hardValue;
                
                if (chartMode === 'sum') {
                    softValue = period.softTVL;
                    hardValue = period.hardDebt;
                } else {
                    softValue = period.soft;
                    hardValue = period.hard;
                }
                
                // Уменьшаем максимальную высоту для мобильных устройств
                const chartHeight = window.innerWidth <= 768 ? 150 : 200;
                const softHeight = maxValue > 0 ? (softValue / maxValue * chartHeight) : 0;
                let hardHeight = maxValue > 0 ? (hardValue / maxValue * chartHeight) : 0;
                
                // Минимальная высота 1px для хард событий, чтобы они были видны
                if (hardValue > 0 && hardHeight < 1) {
                    hardHeight = 1;
                }
                
                // Определяем порядок столбиков - меньший сзади, больший спереди
                let barsHtml = '';
                if (hardValue > softValue) {
                    // Если хард больше - сначала рисуем хард (сзади), потом софт (спереди)
                    barsHtml = `
                        <div class="bar-hard" style="height: ${hardHeight}px; z-index: 1;"></div>
                        <div class="bar-soft" style="height: ${softHeight}px; z-index: 2;"></div>
                    `;
                } else {
                    // Если софт больше или равен - сначала рисуем софт (сзади), потом хард (спереди)
                    barsHtml = `
                        <div class="bar-soft" style="height: ${softHeight}px; z-index: 1;"></div>
                        <div class="bar-hard" style="height: ${hardHeight}px; z-index: 2;"></div>
                    `;
                }
                
                html += `
                    <div class="chart-bar" style="left: ${index * barWidth}%; width: ${barWidth}%;" 
                         onmouseover="showChartTooltip(event, '${dateStr}', ${period.soft}, ${period.hard}, ${period.softTVL}, ${period.hardDebt})"
                         onmouseout="hideChartTooltip()">
                        ${barsHtml}
                    </div>
                `;
            });
            
            // Закрываем контейнер для баров
            html += '</div>';
            
            // Добавляем ось X с правильными метками для разных периодов
            // Создаем контейнер оси X с относительным позиционированием для подписей
            html += '<div class="chart-axis" style="position: absolute; bottom: 0; left: 40px; right: 0; height: 30px; display: block;">';
            
            // Определяем интервал меток в зависимости от периода
            let labelInterval;
            if (actualPeriod === 'month') {
                labelInterval = Math.max(1, Math.floor(dates.length / 12));
            } else if (actualPeriod === 'week') {
                labelInterval = Math.max(1, Math.floor(dates.length / 8));
            } else {
                labelInterval = Math.max(1, Math.floor(dates.length / 6));
            }
            
            for (let i = 0; i < dates.length; i += labelInterval) {
                if (dates[i]) {
                    const date = new Date(dates[i]);
                    let label;
                    
                    if (actualPeriod === 'month') {
                        // Для месяцев показываем "MM/YY"
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const year = date.getFullYear().toString().slice(-2);
                        label = `${month}/${year}`;
                    } else if (actualPeriod === 'week') {
                        // Для недель показываем "DD.MM" (начало недели)
                        label = `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                    } else {
                        // Для дней показываем "DD.MM"
                        label = `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                    }
                    
                    // Позиционируем подпись в центре соответствующего столбца
                    const leftPos = i * barWidth + (barWidth / 2);
                    html += `<span style="position: absolute; left: ${leftPos}%; transform: translateX(-50%); white-space: nowrap;">${label}</span>`;
                }
            }
            html += '</div>';
            
            chartContainer.innerHTML = html;
        }
        
        function showChartTooltip(event, dateStr, soft, hard, softTVL, hardDebt) {
            const tooltip = document.getElementById('chartTooltip');
            const startDate = new Date(dateStr);
            const locale = currentLang === 'en' ? 'en-US' : 'ru-RU';
            
            let dateDisplay;
            if (chartPeriod === 'week') {
                // For week, show range from Monday to Sunday
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6);
                const startStr = startDate.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
                const endStr = endDate.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
                dateDisplay = `${startStr} - ${endStr}`;
            } else if (chartPeriod === 'month') {
                // For month, show month and year
                const monthYear = startDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
                const lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
                const startStr = `1`;
                const endStr = `${lastDay} ${monthYear}`;
                dateDisplay = `${startStr} - ${endStr}`;
            } else {
                // For day, show single date with same format as others
                dateDisplay = startDate.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
            }
            
            // Calculate protected amount
            const protectedAmount = softTVL - hardDebt;
            const protectedPercent = softTVL > 0 ? (protectedAmount / softTVL * 100) : 0;
            const protectedLabel = currentLang === 'ru' ? 'Защищено' : 'Protected';
            
            
            tooltip.innerHTML = `
                <strong>${dateDisplay}</strong><br>
                ${currentLang === 'ru' ? 'Мягких' : 'Soft'}: $${formatNumber(softTVL)} (${soft} ${currentLang === 'ru' ? 'поз.' : 'pos.'})<br>
                ${currentLang === 'ru' ? 'Жёстких' : 'Hard'}: $${formatNumber(hardDebt)} (${hard} ${currentLang === 'ru' ? 'соб.' : 'events'})<br>
                ${protectedLabel}: $${formatNumber(Math.abs(protectedAmount))} (${protectedPercent.toFixed(1)}%)
            `;
            
            tooltip.style.display = 'block';
            tooltip.style.left = event.pageX + 10 + 'px';
            tooltip.style.top = event.pageY - 40 + 'px';
        }
        
        function hideChartTooltip() {
            document.getElementById('chartTooltip').style.display = 'none';
        }

        function renderStats() {
            const statsGrid = document.getElementById('statsGrid');
            
            if (!softData && !hardData) {
                statsGrid.innerHTML = `<div class="loading">${t('noData')}</div>`;
                return;
            }

            let html = '';
            
            // Используем отфильтрованные данные если они есть, иначе оригинальные
            const softToUse = filteredSoftData || softData;
            const hardToUse = filteredHardData || hardData;
            
            // Определяем, нужно ли пересчитывать или использовать готовые суммы
            let softTVL = 0;
            let hardDebtWithDiscount = 0;
            
            // Проверяем, применены ли фильтры
            const hasFilters = (tableDateStart || tableDateEnd || 
                               (filteredSoftData && filteredSoftData.positions?.length !== softData?.positions?.length) ||
                               (filteredHardData && filteredHardData.events?.length !== hardData?.events?.length));
            
            if (hasFilters) {
                // Пересчитываем TVL для soft с учетом всех фильтров
                if (softToUse?.positions) {
                    let positions = softToUse.positions;
                    if (tableDateStart || tableDateEnd) {
                        positions = positions.filter(pos => {
                            if (!pos.first_dt) return false;
                            const openDate = new Date(pos.first_dt);
                            const closeDate = pos.last_dt ? new Date(pos.last_dt) : new Date();
                            
                            // Position is active if it overlaps with the date range
                            const rangeEnd = tableDateEnd || new Date();
                            const rangeStart = tableDateStart || new Date(0);
                            
                            return openDate <= rangeEnd && closeDate >= rangeStart;
                        });
                    }
                    softTVL = positions.reduce((sum, pos) => sum + parseFloat(pos.tvl || pos.collateral_usd || 0), 0);
                }
                
                // Пересчитываем debt для hard с учетом всех фильтров
                if (hardToUse?.events) {
                    let events = hardToUse.events;
                    if (tableDateStart || tableDateEnd) {
                        events = events.filter(event => {
                            if (!event.timestamp) return false;
                            const date = new Date(event.timestamp);
                            if (tableDateStart && date < tableDateStart) return false;
                            if (tableDateEnd && date > tableDateEnd) return false;
                            return true;
                        });
                    }
                    events.forEach(event => {
                        // Используем готовое значение debt_with_discount из JSON
                        hardDebtWithDiscount += parseFloat(event.debt_with_discount || event.debt || 0);
                    });
                }
            } else {
                // Используем готовые суммы из summary/total когда нет фильтров
                softTVL = softData?.summary?.total_tvl || 0;
                hardDebtWithDiscount = hardData?.total?.debt_with_discount || 0;
                
                // Отладочный вывод
            }
            
            const protectedAmount = softTVL - hardDebtWithDiscount;
            const protectionPercent = softTVL > 0 ? (protectedAmount / softTVL * 100) : 0;
            
            
            // Минималистичные карточки с нашими данными
            
            // Карточка Protection Rate (выделенная) - ПЕРВАЯ
            if (softData && hardData) {
                const isPositive = protectedAmount > 0;
                const ofTVL = softTVL > 0 ? (protectedAmount / softTVL * 100) : 0;
                
                html += `
                    <div class="stat-card protection ${!isPositive ? 'negative' : ''}">
                        <div class="stat-label">
                            ${t('protectedFromLiquidation')}
                            <span class="info-icon" onclick="showMethodologyPopup()" title="${currentLang === 'ru' ? 'Методология' : 'Methodology'}">?</span>
                        </div>
                        <div class="protection-content">
                            <div class="protection-chart-container">
                                <canvas id="protectionChartInline" width="150" height="150"></canvas>
                                <div class="chart-center-text">
                                    <div class="chart-percent">${Math.abs(ofTVL).toFixed(1)}%*</div>
                                </div>
                            </div>
                            <div class="protection-info">
                                <div class="stat-value">$${formatNumber(Math.abs(protectedAmount))}</div>
                                <div class="protection-description">
                                    <span class="percent-asterisk">*${Math.abs(ofTVL).toFixed(1)}%</span> ${t('ofTVLInSoft')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Карточка Soft Liquidations
            if (softToUse) {
                const softPositions = softToUse.positions?.length || 0;
                const softDebt = softToUse.positions?.reduce((sum, pos) => sum + parseFloat(pos.debt || 0), 0) || 0;
                const uniqueUsers = new Set(softToUse.positions?.map(p => p.user)).size;
                const positionsPerUser = uniqueUsers > 0 ? (softPositions / uniqueUsers).toFixed(2) : 0;
                const avgSoftPosition = softPositions > 0 ? softTVL / softPositions : 0;
                
                html += `
                    <div class="stat-card">
                        <div class="stat-label">${t('softLiquidationsLabel')}</div>
                        <div class="stat-value">$${formatNumber(softTVL)}</div>
                        <div class="stat-details">
                            <div class="stat-row"><span>${t('positionsLabel')}:</span> <strong>${formatNumber(softPositions)}</strong></div>
                            <div class="stat-row"><span>${t('totalDebt')}:</span> <strong>$${formatNumber(softDebt)}</strong></div>
                            <div class="stat-row"><span>${t('positionsPerUser')}:</span> <strong>${positionsPerUser}</strong></div>
                            <div class="stat-row"><span>${t('averagePosition')}:</span> <strong>$${formatNumber(avgSoftPosition)}</strong></div>
                        </div>
                    </div>
                `;
            }
            
            // Карточка Hard Liquidations
            if (hardToUse) {
                const hardEvents = hardToUse.events?.length || 0;
                const hardDebtNoDiscount = hardToUse.events?.reduce((sum, event) => sum + parseFloat(event.debt || 0), 0) || 0;
                const avgDiscount = hardDebtNoDiscount > 0 ? ((hardDebtWithDiscount - hardDebtNoDiscount) / hardDebtNoDiscount * 100) : 0;
                const avgHardSize = hardEvents > 0 ? hardDebtNoDiscount / hardEvents : 0;
                
                html += `
                    <div class="stat-card">
                        <div class="stat-label">${t('hardLiquidationsLabel')}</div>
                        <div class="stat-value">$${formatNumber(hardDebtWithDiscount)}</div>
                        <div class="stat-details">
                            <div class="stat-row"><span>${t('events')}:</span> <strong>${formatNumber(hardEvents)}</strong></div>
                            <div class="stat-row"><span>${currentLang === 'ru' ? 'Долг без дисконта' : 'Debt without discount'}:</span> <strong>$${formatNumber(hardDebtNoDiscount)}</strong></div>
                            <div class="stat-row"><span>${currentLang === 'ru' ? 'Средний дисконт' : 'Average discount'}:</span> <strong>${avgDiscount.toFixed(1)}%</strong></div>
                            <div class="stat-row"><span>${currentLang === 'ru' ? 'Средний размер' : 'Average size'}:</span> <strong>$${formatNumber(avgHardSize)}</strong></div>
                        </div>
                    </div>
                `;
            }
            
            statsGrid.innerHTML = html;
            
            // Draw protection chart if present - use setTimeout to ensure DOM is ready
            setTimeout(() => updateProtectionChart(), 100);
            
            // Обновляем опции фильтров
            updateFilterOptions();
        }

        // Setup high DPI canvas
        function setupHighDPICanvas(canvas, width, height) {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            
            return ctx;
        }
        
        // Function to update the protection chart
        function updateProtectionChart() {
            const canvas = document.getElementById('protectionChartInline');
            if (!canvas) return;
            
            // Get the protection card to read the percentage
            const protectionCard = document.querySelector('.stat-card.protection');
            if (!protectionCard) return;
            
            // Check if card has negative class
            const isCardNegative = protectionCard.classList.contains('negative');
            
            // Extract percentage from the chart-percent element
            const percentElement = protectionCard.querySelector('.chart-percent');
            let protectionPercent = 0;
            
            if (percentElement) {
                const percentMatch = percentElement.textContent.match(/-?\d+\.?\d*/);
                if (percentMatch) {
                    protectionPercent = Math.abs(parseFloat(percentMatch[0]));
                }
            }
            
            // Debug logging
            console.log('Protection percent extracted:', protectionPercent);
            
            // Set canvas size with high DPI support
            const width = 150;
            const height = 150;
            const ctx = setupHighDPICanvas(canvas, width, height);
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2 - 12;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Draw background circle (track)
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 16;
            ctx.stroke();
            
            // Draw protection arc only if percentage > 0
            if (protectionPercent && protectionPercent > 0) {
                const startAngle = -Math.PI / 2;
                const endAngle = startAngle + (2 * Math.PI * protectionPercent / 100);
                
                console.log('Drawing arc for', protectionPercent + '%');
                
                // Create gradient for the arc - match the card's background color
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                const theme = localStorage.getItem('theme') || 'light';
                
                if (!isCardNegative) {  // Use card's state directly
                    if (theme === 'chad') {
                        // Purple gradient for Chad theme
                        gradient.addColorStop(0, '#9171d8');
                        gradient.addColorStop(1, '#6b46c1');
                    } else {
                        // White to light gray for positive protection (green background)
                        gradient.addColorStop(0, '#ffffff');
                        gradient.addColorStop(1, '#f0f0f0');
                    }
                } else {
                    if (theme === 'chad') {
                        // Darker purple for negative in Chad theme
                        gradient.addColorStop(0, '#7a5bc0');
                        gradient.addColorStop(1, '#553399');
                    } else {
                        // Red tones for negative protection (red background)
                        gradient.addColorStop(0, '#ff6b6b');
                        gradient.addColorStop(1, '#ff4444');
                    }
                }
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 16;
                ctx.lineCap = 'round';
                ctx.stroke();
            } else {
                console.log('No percentage to draw - value is:', protectionPercent);
            }
        }
        
        // Export to window for global access
        window.updateProtectionChart = updateProtectionChart;
        window.loadScriptByName = loadScriptByName;
        window.processLoadedData = processLoadedData;

        function renderData() {
            const dataTable = document.getElementById('dataTable');
            
            // Update distribution charts only if we have data
            if (filteredSoftData || filteredHardData || softData || hardData) {
                updateDistributionCharts();
            }
            
            if (currentTab === 'soft') {
                renderSoftLiquidations(dataTable);
            } else if (currentTab === 'hard') {
                renderHardLiquidations(dataTable);
            } else if (currentTab === 'comparison') {
                renderComparison(dataTable);
            }
        }

        function renderSoftLiquidations(container) {
            // Add tab buttons at the top
            let html = `
                <div style="display: flex; gap: 0; margin-bottom: 20px; align-items: center; justify-content: flex-end;">
                    <div style="display: inline-flex; gap: 8px; background: transparent; padding: 0; border-radius: 0;">
                        <button class="tab ${currentTab === 'soft' ? 'active' : ''}" onclick="window.switchTab('soft')">
                            ${t('softLiquidations')}
                        </button>
                        <button class="tab ${currentTab === 'hard' ? 'active' : ''}" onclick="window.switchTab('hard')">
                            ${t('hardLiquidations')}
                        </button>
                        <button class="tab ${currentTab === 'comparison' ? 'active' : ''}" onclick="window.switchTab('comparison')">
                            ${t('comparison')}
                        </button>
                    </div>
                </div>
            `;
            
            if (!filteredSoftData || !filteredSoftData.positions) {
                container.innerHTML = html + `<div class="no-data">${t('noData')}</div>`;
                document.getElementById('pagination').style.display = 'none';
                return;
            }

            let positions = [...filteredSoftData.positions];
            
            // Фильтрация по датам если указаны
            if (tableDateStart || tableDateEnd) {
                positions = positions.filter(pos => {
                    if (!pos.first_dt) return false;
                    const date = new Date(pos.first_dt);
                    if (tableDateStart && date < tableDateStart) return false;
                    if (tableDateEnd && date > tableDateEnd) return false;
                    return true;
                });
            }
            if (positions.length === 0) {
                container.innerHTML = html + `<div class="no-data">${t('noPositionsMatchingFilters')}</div>`;
                document.getElementById('pagination').style.display = 'none';
                return;
            }
            
            // Сортировка
            positions.sort((a, b) => {
                let aVal, bVal;
                
                switch(sortColumn) {
                    case 'first_dt':
                        aVal = a[sortColumn] ? new Date(a[sortColumn]).getTime() : 0;
                        bVal = b[sortColumn] ? new Date(b[sortColumn]).getTime() : 0;
                        break;
                    case 'tvl':
                        aVal = a[sortColumn] || 0;
                        bVal = b[sortColumn] || 0;
                        break;
                    case 'market_name':
                    case 'platform':
                    case 'chain':
                    case 'user':
                    case 'collateral_token':
                        aVal = (a[sortColumn] || '').toLowerCase();
                        bVal = (b[sortColumn] || '').toLowerCase();
                        break;
                    default:
                        aVal = a[sortColumn];
                        bVal = b[sortColumn];
                }
                
                if (sortDirection === 'asc') {
                    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                } else {
                    return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
                }
            });
            
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageData = positions.slice(start, end);

            html += `
                <div class="table-wrapper">
                    <div class="table-header">
                        <h2 style="margin: 0;">${t('softLiquidationsInPositions')}</h2>
                    </div>
                <table>
                    <thead>
                        <tr>
                            <th class="sortable" onclick="sortTable('first_dt')">
                                ${t('date')} ${getSortArrow('first_dt')}
                            </th>
                            <th class="sortable" onclick="sortTable('platform')">
                                ${t('platform')} ${getSortArrow('platform')}
                            </th>
                            <th class="sortable" onclick="sortTable('market_name')">
                                ${t('market')} ${getSortArrow('market_name')}
                            </th>
                            <th class="sortable" onclick="sortTable('chain')">
                                ${t('network')} ${getSortArrow('chain')}
                            </th>
                            <th class="sortable" onclick="sortTable('user')">
                                ${t('user')} ${getSortArrow('user')}
                            </th>
                            <th class="sortable" onclick="sortTable('collateral_token')">
                                ${t('token')} ${getSortArrow('collateral_token')}
                            </th>
                            <th class="sortable" onclick="sortTable('tvl')">
                                ${t('maxTVL')} ${getSortArrow('tvl')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            pageData.forEach(pos => {
                const locale = currentLang === 'en' ? 'en-US' : 'ru-RU';
                const dateOnly = pos.first_dt ? new Date(pos.first_dt).toLocaleDateString(locale) : 'N/A';
                
                // Определяем базовый URL для адресов в зависимости от сети
                let addressBaseUrl = '';
                switch(pos.chain) {
                    case 'ETHEREUM':
                        addressBaseUrl = 'https://etherscan.io/address/';
                        break;
                    case 'ARBITRUM':
                        addressBaseUrl = 'https://arbiscan.io/address/';
                        break;
                    case 'OPTIMISM':
                        addressBaseUrl = 'https://optimistic.etherscan.io/address/';
                        break;
                    case 'POLYGON':
                        addressBaseUrl = 'https://polygonscan.com/address/';
                        break;
                    case 'GNOSIS':
                        addressBaseUrl = 'https://gnosisscan.io/address/';
                        break;
                    case 'BASE':
                        addressBaseUrl = 'https://basescan.org/address/';
                        break;
                    case 'FRAXTAL':
                        addressBaseUrl = 'https://fraxscan.com/address/';
                        break;
                    default:
                        addressBaseUrl = 'https://etherscan.io/address/';
                }
                
                const userDisplay = pos.user ? 
                    `<a href="${addressBaseUrl}${pos.user}" target="_blank" title="${pos.user}" class="explorer-link">${formatAddress(pos.user)}</a>` : 
                    'N/A';
                
                html += `
                    <tr>
                        <td>${dateOnly}</td>
                        <td>${pos.platform || 'N/A'}</td>
                        <td>${pos.market_name || 'N/A'}</td>
                        <td>
                            ${(() => {
                                const iconUrl = getNetworkIconUrl(pos.chain);
                                return iconUrl ? `<img src="${iconUrl}" alt="${pos.chain}" style="width: 16px; height: 16px; border-radius: 50%; vertical-align: middle; margin-right: 4px;" crossorigin="anonymous" onerror="this.onerror=null; this.style.display='none';">` : '';
                            })()}
                            ${pos.chain || 'N/A'}
                        </td>
                        <td>${userDisplay}</td>
                        <td>
                            ${(() => {
                                const iconUrl = getTokenIconUrl(pos.collateral_token);
                                return iconUrl ? `<img src="${iconUrl}" alt="${pos.collateral_token}" style="width: 16px; height: 16px; border-radius: 50%; vertical-align: middle; margin-right: 4px;" crossorigin="anonymous" onerror="this.onerror=null; this.style.display='none';">` : '';
                            })()}
                            ${pos.collateral_token || 'N/A'}
                        </td>
                        <td>$${formatNumber(pos.tvl || 0)}</td>
                    </tr>
                `;
            });

            html += '</tbody></table></div>';
            container.innerHTML = html;
            
            // Check if table needs scrolling on mobile
            setTimeout(() => {
                const table = container.querySelector('table');
                const indicator = document.getElementById('scrollHintSoft');
                if (table && indicator && window.innerWidth <= 768) {
                    if (table.scrollWidth > table.clientWidth) {
                        indicator.style.display = 'block';
                    } else {
                        indicator.style.display = 'none';
                    }
                }
            }, 100);
            
            renderPagination(positions.length);
        }

        function renderHardLiquidations(container) {
            // Add tab buttons at the top
            let html = `
                <div style="display: flex; gap: 0; margin-bottom: 20px; align-items: center; justify-content: flex-end;">
                    <div style="display: inline-flex; gap: 8px; background: transparent; padding: 0; border-radius: 0;">
                        <button class="tab ${currentTab === 'soft' ? 'active' : ''}" onclick="window.switchTab('soft')">
                            ${t('softLiquidations')}
                        </button>
                        <button class="tab ${currentTab === 'hard' ? 'active' : ''}" onclick="window.switchTab('hard')">
                            ${t('hardLiquidations')}
                        </button>
                        <button class="tab ${currentTab === 'comparison' ? 'active' : ''}" onclick="window.switchTab('comparison')">
                            ${t('comparison')}
                        </button>
                    </div>
                </div>
            `;
            
            if (!filteredHardData || !filteredHardData.events) {
                container.innerHTML = html + `<div class="no-data">${t('noData')}</div>`;
                document.getElementById('pagination').style.display = 'none';
                return;
            }

            let events = [...filteredHardData.events];
            
            // Фильтрация по датам если указаны
            if (tableDateStart || tableDateEnd) {
                events = events.filter(event => {
                    if (!event.timestamp) return false;
                    const date = new Date(event.timestamp);
                    if (tableDateStart && date < tableDateStart) return false;
                    if (tableDateEnd && date > tableDateEnd) return false;
                    return true;
                });
            }
            if (events.length === 0) {
                container.innerHTML = html + `<div class="no-data">${t('noEventsMatchingFilters')}</div>`;
                document.getElementById('pagination').style.display = 'none';
                return;
            }
            
            // Сортировка хард ликвидаций
            events.sort((a, b) => {
                let aVal, bVal;
                
                switch(hardSortColumn) {
                    case 'timestamp':
                        aVal = a.timestamp ? new Date(a.timestamp).getTime() : 0;
                        bVal = b.timestamp ? new Date(b.timestamp).getTime() : 0;
                        break;
                    case 'debt':
                        aVal = a.debt || 0;
                        bVal = b.debt || 0;
                        break;
                    case 'liquidation_discount':
                        aVal = a.liquidation_discount || 0;
                        bVal = b.liquidation_discount || 0;
                        break;
                    case 'market_name':
                    case 'platform':
                    case 'chain':
                    case 'user':
                    case 'liquidator':
                    case 'collateral_token':
                        aVal = (a[hardSortColumn] || '').toLowerCase();
                        bVal = (b[hardSortColumn] || '').toLowerCase();
                        break;
                    default:
                        aVal = a[hardSortColumn];
                        bVal = b[hardSortColumn];
                }
                
                if (hardSortDirection === 'asc') {
                    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                } else {
                    return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
                }
            });
            
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageData = events.slice(start, end);

            html += `
                <div class="table-wrapper">
                    <div class="table-header">
                        <h2 style="margin: 0;">${t('hardLiquidations')}</h2>
                    </div>
                <table>
                    <thead>
                        <tr>
                            <th class="sortable" onclick="sortHardTable('timestamp')">
                                ${t('dateAndTime')} ${getHardSortArrow('timestamp')}
                            </th>
                            <th class="sortable" onclick="sortHardTable('platform')">
                                ${t('platform')} ${getHardSortArrow('platform')}
                            </th>
                            <th class="sortable" onclick="sortHardTable('market_name')">
                                ${t('market')} ${getHardSortArrow('market_name')}
                            </th>
                            <th class="sortable" onclick="sortHardTable('chain')">
                                ${t('network')} ${getHardSortArrow('chain')}
                            </th>
                            <th class="sortable" onclick="sortHardTable('user')">
                                ${t('user')} ${getHardSortArrow('user')}
                            </th>
                            <th class="sortable" onclick="sortHardTable('liquidator')">
                                ${t('liquidator')} ${getHardSortArrow('liquidator')}
                            </th>
                            <th class="sortable" onclick="sortHardTable('collateral_token')">
                                ${t('token')} ${getHardSortArrow('collateral_token')}
                            </th>
                            <th class="sortable" onclick="sortHardTable('debt')">
                                ${t('debt')} ${getHardSortArrow('debt')}
                            </th>
                            <th class="sortable" onclick="sortHardTable('liquidation_discount')">
                                ${t('discount')} ${getHardSortArrow('liquidation_discount')}
                            </th>
                            <th>${t('txHash')}</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            pageData.forEach(event => {
                const date = new Date(event.timestamp);
                const locale = currentLang === 'en' ? 'en-US' : 'ru-RU';
                const dateTimeStr = `${date.toLocaleDateString(locale)} ${date.toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit', second: '2-digit'})}`;
                
                // Определяем правильный explorer в зависимости от сети
                let explorerUrl = '';
                if (event.transaction_hash) {
                    switch(event.chain) {
                        case 'ETHEREUM':
                            explorerUrl = `https://etherscan.io/tx/${event.transaction_hash}`;
                            break;
                        case 'ARBITRUM':
                            explorerUrl = `https://arbiscan.io/tx/${event.transaction_hash}`;
                            break;
                        case 'OPTIMISM':
                            explorerUrl = `https://optimistic.etherscan.io/tx/${event.transaction_hash}`;
                            break;
                        case 'POLYGON':
                            explorerUrl = `https://polygonscan.com/tx/${event.transaction_hash}`;
                            break;
                        case 'GNOSIS':
                            explorerUrl = `https://gnosisscan.io/tx/${event.transaction_hash}`;
                            break;
                        case 'BASE':
                            explorerUrl = `https://basescan.org/tx/${event.transaction_hash}`;
                            break;
                        case 'FRAXTAL':
                            explorerUrl = `https://fraxscan.com/tx/${event.transaction_hash}`;
                            break;
                        default:
                            explorerUrl = `https://etherscan.io/tx/${event.transaction_hash}`;
                    }
                }
                
                // Определяем базовый URL для адресов
                let addressBaseUrl = '';
                switch(event.chain) {
                    case 'ETHEREUM':
                        addressBaseUrl = 'https://etherscan.io/address/';
                        break;
                    case 'ARBITRUM':
                        addressBaseUrl = 'https://arbiscan.io/address/';
                        break;
                    case 'OPTIMISM':
                        addressBaseUrl = 'https://optimistic.etherscan.io/address/';
                        break;
                    case 'POLYGON':
                        addressBaseUrl = 'https://polygonscan.com/address/';
                        break;
                    case 'GNOSIS':
                        addressBaseUrl = 'https://gnosisscan.io/address/';
                        break;
                    case 'BASE':
                        addressBaseUrl = 'https://basescan.org/address/';
                        break;
                    case 'FRAXTAL':
                        addressBaseUrl = 'https://fraxscan.com/address/';
                        break;
                    default:
                        addressBaseUrl = 'https://etherscan.io/address/';
                }
                
                const txHashDisplay = event.transaction_hash ? 
                    `<a href="${explorerUrl}" target="_blank" title="${event.transaction_hash}" class="explorer-link">${event.transaction_hash.substring(0, 8)}...</a>` : 
                    'N/A';
                
                const userDisplay = event.user ? 
                    `<a href="${addressBaseUrl}${event.user}" target="_blank" title="${event.user}" class="explorer-link">${formatAddress(event.user)}</a>` : 
                    'N/A';
                
                const liquidatorDisplay = event.liquidator ? 
                    `<a href="${addressBaseUrl}${event.liquidator}" target="_blank" title="${event.liquidator}" class="explorer-link">${formatAddress(event.liquidator)}</a>` : 
                    'N/A';
                
                html += `
                    <tr>
                        <td>${dateTimeStr}</td>
                        <td>${event.platform || 'N/A'}</td>
                        <td>${event.market_name || 'N/A'}</td>
                        <td>
                            ${(() => {
                                const iconUrl = getNetworkIconUrl(event.chain);
                                return iconUrl ? `<img src="${iconUrl}" alt="${event.chain}" style="width: 16px; height: 16px; border-radius: 50%; vertical-align: middle; margin-right: 4px;" crossorigin="anonymous" onerror="this.onerror=null; this.style.display='none';">` : '';
                            })()}
                            ${event.chain || 'N/A'}
                        </td>
                        <td>${userDisplay}</td>
                        <td>${liquidatorDisplay}</td>
                        <td>
                            ${(() => {
                                const iconUrl = getTokenIconUrl(event.collateral_token);
                                return iconUrl ? `<img src="${iconUrl}" alt="${event.collateral_token}" style="width: 16px; height: 16px; border-radius: 50%; vertical-align: middle; margin-right: 4px;" crossorigin="anonymous" onerror="this.onerror=null; this.style.display='none';">` : '';
                            })()}
                            ${event.collateral_token || 'N/A'}
                        </td>
                        <td>$${formatNumber(event.debt || 0)}</td>
                        <td>${((event.liquidation_discount || 0) * 100).toFixed(2)}%</td>
                        <td>${txHashDisplay}</td>
                    </tr>
                `;
            });

            html += '</tbody></table></div>';
            container.innerHTML = html;
            
            // Check if table needs scrolling on mobile
            setTimeout(() => {
                const table = container.querySelector('table');
                const indicator = document.getElementById('scrollHintHard');
                if (table && indicator && window.innerWidth <= 768) {
                    if (table.scrollWidth > table.clientWidth) {
                        indicator.style.display = 'block';
                    } else {
                        indicator.style.display = 'none';
                    }
                }
            }, 100);
            
            renderPagination(events.length);
        }

        function changeComparisonGroup() {
            const select = document.getElementById('comparisonGroup');
            if (select) {
                comparisonGroupBy = select.value;
                currentPage = 1;
                renderData();
            }
        }
        
        function renderComparison(container) {
            // Add tab buttons with comparison selector
            let html = `
                <div style="display: flex; gap: 0; margin-bottom: 20px; align-items: center; justify-content: flex-end;">
                    <div style="display: inline-flex; gap: 8px; background: transparent; padding: 0; border-radius: 0;">
                        <button class="tab ${currentTab === 'soft' ? 'active' : ''}" onclick="window.switchTab('soft')">
                            ${t('softLiquidations')}
                        </button>
                        <button class="tab ${currentTab === 'hard' ? 'active' : ''}" onclick="window.switchTab('hard')">
                            ${t('hardLiquidations')}
                        </button>
                        <button class="tab ${currentTab === 'comparison' ? 'active' : ''}" onclick="window.switchTab('comparison')">
                            ${t('comparison')}
                        </button>
                    </div>
                </div>
            `;
            
            if (!filteredSoftData || !filteredHardData) {
                container.innerHTML = html + `<div class="no-data">${currentLang === 'en' ? 'Insufficient data for comparison' : 'Недостаточно данных для сравнения'}</div>`;
                document.getElementById('pagination').style.display = 'none';
                return;
            }

            // Собираем статистику в зависимости от типа группировки
            const stats = {};
            
            // First create a map of soft positions for duplicate detection
            const softPositionsMap = new Map();
            
            // Софт ликвидации
            if (filteredSoftData.positions) {
                // Фильтруем по датам если указаны
                let positions = filteredSoftData.positions;
                if (tableDateStart || tableDateEnd) {
                    positions = positions.filter(pos => {
                        if (!pos.first_dt) return false;
                        const openDate = new Date(pos.first_dt);
                        const closeDate = pos.last_dt ? new Date(pos.last_dt) : new Date();
                        
                        // Position is active if it overlaps with the date range
                        const rangeEnd = tableDateEnd || new Date();
                        const rangeStart = tableDateStart || new Date(0);
                        
                        return openDate <= rangeEnd && closeDate >= rangeStart;
                    });
                }
                
                // Build soft positions map for duplicate detection
                positions.forEach(pos => {
                    if (pos.user && pos.market_id) {
                        const key = `${pos.user}_${pos.market_id}`;
                        if (!softPositionsMap.has(key)) {
                            softPositionsMap.set(key, []);
                        }
                        softPositionsMap.get(key).push({
                            first_dt: pos.first_dt ? new Date(pos.first_dt) : null,
                            last_dt: pos.last_dt ? new Date(pos.last_dt) : new Date('2100-01-01')
                        });
                    }
                });
                
                positions.forEach(pos => {
                    let key, label;
                    
                    switch(comparisonGroupBy) {
                        case 'platform':
                            key = pos.platform;
                            label = pos.platform;
                            break;
                        case 'token':
                            key = pos.collateral_token;
                            label = pos.collateral_token;
                            break;
                        case 'chain':
                            key = pos.chain;
                            label = pos.chain;
                            break;
                        default: // market
                            key = `${pos.market_name}_${pos.platform}`;
                            label = pos.market_name;
                            break;
                    }
                    
                    if (!stats[key]) {
                        stats[key] = {
                            label: label,
                            market: pos.market_name,
                            platform: pos.platform,
                            chain: pos.chain,
                            token: pos.collateral_token,
                            softCount: 0,
                            softTVL: 0,
                            softDebt: 0,
                            hardCount: 0,
                            hardDebt: 0,
                            hardDuplicates: 0  // Track duplicate hard liquidations
                        };
                    }
                    stats[key].softCount++;
                    stats[key].softTVL += pos.tvl || 0;
                    stats[key].softDebt += pos.debt || 0;
                });
            }
            
            // Хард ликвидации
            if (filteredHardData.events) {
                // Фильтруем по датам если указаны
                let events = filteredHardData.events;
                if (tableDateStart || tableDateEnd) {
                    events = events.filter(event => {
                        if (!event.timestamp) return false;
                        const date = new Date(event.timestamp);
                        if (tableDateStart && date < tableDateStart) return false;
                        if (tableDateEnd && date > tableDateEnd) return false;
                        return true;
                    });
                }
                
                events.forEach((event, idx) => {
                    // Check if this hard liquidation is a duplicate of a soft position
                    let isDuplicate = false;
                    if (event.user && event.market_id && event.timestamp) {
                        const posKey = `${event.user}_${event.market_id}`;
                        const eventTime = new Date(event.timestamp);
                        const positions = softPositionsMap.get(posKey);
                        
                        if (positions) {
                            isDuplicate = positions.some(pos => {
                                const match = pos.first_dt && eventTime >= pos.first_dt && eventTime <= pos.last_dt;
                                return match;
                            });
                        }
                    }
                    
                    let key, label;
                    
                    switch(comparisonGroupBy) {
                        case 'platform':
                            key = event.platform;
                            label = event.platform;
                            break;
                        case 'token':
                            key = event.collateral_token;
                            label = event.collateral_token;
                            break;
                        case 'chain':
                            key = event.chain;
                            label = event.chain;
                            break;
                        default: // market
                            key = `${event.market_name}_${event.platform}`;
                            label = event.market_name;
                            break;
                    }
                    
                    if (!stats[key]) {
                        stats[key] = {
                            label: label,
                            market: event.market_name,
                            platform: event.platform,
                            chain: event.chain,
                            token: event.collateral_token,
                            softCount: 0,
                            softTVL: 0,
                            softDebt: 0,
                            hardCount: 0,
                            hardDebt: 0,
                            hardDuplicates: 0
                        };
                    }
                    stats[key].hardCount++;
                    stats[key].hardDebt += event.debt_with_discount || event.debt || 0;
                    if (isDuplicate) {
                        stats[key].hardDuplicates++;
                    }
                });
            }
            
            let statsArray = Object.values(stats);
            
            // Проверяем, есть ли данные после фильтрации
            if (statsArray.length === 0) {
                container.innerHTML = html + `<div class="no-data">${currentLang === 'en' ? 'No data in the selected date range' : 'Нет данных в выбранном диапазоне дат'}</div>`;
                document.getElementById('pagination').style.display = 'none';
                return;
            }
            
            // Сортировка сравнения
            statsArray.sort((a, b) => {
                let aVal, bVal;
                
                switch(compareSortColumn) {
                    case 'softTVL':
                        aVal = a.softTVL;
                        bVal = b.softTVL;
                        break;
                    case 'softDebt':
                        aVal = a.softDebt;
                        bVal = b.softDebt;
                        break;
                    case 'softCount':
                        aVal = a.softCount;
                        bVal = b.softCount;
                        break;
                    case 'hardDebt':
                        aVal = a.hardDebt;
                        bVal = b.hardDebt;
                        break;
                    case 'hardCount':
                        aVal = a.hardCount;
                        bVal = b.hardCount;
                        break;
                    case 'protectedPositions':
                        aVal = Math.max(0, a.softCount - a.hardCount + (a.hardDuplicates || 0));
                        bVal = Math.max(0, b.softCount - b.hardCount + (b.hardDuplicates || 0));
                        break;
                    case 'protected':
                        aVal = a.softTVL - a.hardDebt;
                        bVal = b.softTVL - b.hardDebt;
                        break;
                    case 'label':
                    case 'market':
                    case 'platform':
                    case 'chain':
                        aVal = (a[compareSortColumn] || '').toLowerCase();
                        bVal = (b[compareSortColumn] || '').toLowerCase();
                        break;
                    default:
                        aVal = a[compareSortColumn];
                        bVal = b[compareSortColumn];
                }
                
                if (compareSortDirection === 'asc') {
                    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                } else {
                    return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
                }
            });
            
            if (statsArray.length === 0) {
                container.innerHTML = html + `<div class="no-data">${t('noData')}</div>`;
                document.getElementById('pagination').style.display = 'none';
                return;
            }
            
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageData = statsArray.slice(start, end);

            // Сохраняем текущее значение выбора
            const currentValue = comparisonGroupBy;
            
            // Append to existing HTML (which already has tabs)
            html += `
                <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0;">${t('comparison')}</h2>
                    <select id="comparisonGroup" onchange="changeComparisonGroup()">
                        <option value="market" ${comparisonGroupBy === 'market' ? 'selected' : ''}>${t('byMarkets')}</option>
                        <option value="platform" ${comparisonGroupBy === 'platform' ? 'selected' : ''}>${t('byPlatforms')}</option>
                        <option value="token" ${comparisonGroupBy === 'token' ? 'selected' : ''}>${t('byTokens')}</option>
                        <option value="chain" ${comparisonGroupBy === 'chain' ? 'selected' : ''}>${t('byNetworks')}</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>`;
            
            // Динамические заголовки в зависимости от типа группировки
            switch(comparisonGroupBy) {
                case 'platform':
                    html += `
                        <th class="sortable" onclick="sortCompareTable('label')">
                            ${t('platform')} ${getCompareSortArrow('label')}
                        </th>`;
                    break;
                case 'token':
                    html += `
                        <th class="sortable" onclick="sortCompareTable('label')">
                            ${t('token')} ${getCompareSortArrow('label')}
                        </th>`;
                    break;
                case 'chain':
                    html += `
                        <th class="sortable" onclick="sortCompareTable('label')">
                            ${t('chain')} ${getCompareSortArrow('label')}
                        </th>`;
                    break;
                default: // market
                    html += `
                        <th class="sortable" onclick="sortCompareTable('platform')">
                            ${t('platform')} ${getCompareSortArrow('platform')}
                        </th>
                        <th class="sortable" onclick="sortCompareTable('label')">
                            ${t('market')} ${getCompareSortArrow('label')}
                        </th>`;
                    break;
            }
            
            html += `
                            <th class="sortable" onclick="sortCompareTable('softCount')">
                                ${t('softPositions')} ${getCompareSortArrow('softCount')}
                            </th>
                            <th class="sortable" onclick="sortCompareTable('softTVL')">
                                ${t('totalSoftTVL')} ${getCompareSortArrow('softTVL')}
                            </th>
                            <th class="sortable" onclick="sortCompareTable('softDebt')">
                                ${t('softDebt')} ${getCompareSortArrow('softDebt')}
                            </th>
                            <th class="sortable" onclick="sortCompareTable('hardCount')">
                                ${t('hardEvents')} ${getCompareSortArrow('hardCount')}
                            </th>
                            <th class="sortable" onclick="sortCompareTable('hardDebt')">
                                ${t('totalHardDebt')} ${getCompareSortArrow('hardDebt')}
                            </th>
                            <th class="sortable" onclick="sortCompareTable('protectedPositions')" title="${currentLang === 'en' ? 'Positions protected from hard liquidation' : 'Позиции защищенные от хард ликвидации'}">
                                ${currentLang === 'en' ? 'Protected Pos.' : 'Защищено поз.'} ${getCompareSortArrow('protectedPositions')}
                            </th>
                            <th class="sortable" onclick="sortCompareTable('protected')">
                                ${t('protected')} ${getCompareSortArrow('protected')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            pageData.forEach(stat => {
                const protected = stat.softTVL - stat.hardDebt;
                const protectedPercent = stat.softTVL > 0 ? (protected / stat.softTVL * 100) : 0;
                const protectedColor = protected > 0 ? 'green' : 'red';
                
                html += '<tr>';
                
                // Динамические колонки в зависимости от типа группировки
                switch(comparisonGroupBy) {
                    case 'platform':
                        html += `<td>${stat.label || 'N/A'}</td>`;
                        break;
                    case 'token':
                        html += `<td>
                            ${(() => {
                                const iconUrl = getTokenIconUrl(stat.label);
                                return iconUrl ? `<img src="${iconUrl}" alt="${stat.label}" style="width: 16px; height: 16px; border-radius: 50%; vertical-align: middle; margin-right: 4px;" crossorigin="anonymous" onerror="this.onerror=null; this.style.display='none';">` : '';
                            })()}
                            ${stat.label || 'N/A'}
                        </td>`;
                        break;
                    case 'chain':
                        html += `<td>
                            ${(() => {
                                const iconUrl = getNetworkIconUrl(stat.label);
                                return iconUrl ? `<img src="${iconUrl}" alt="${stat.label}" style="width: 16px; height: 16px; border-radius: 50%; vertical-align: middle; margin-right: 4px;" crossorigin="anonymous" onerror="this.onerror=null; this.style.display='none';">` : '';
                            })()}
                            ${stat.label || 'N/A'}
                        </td>`;
                        break;
                    default: // market
                        html += `
                            <td>${stat.platform || 'N/A'}</td>
                            <td>${stat.label || 'N/A'}</td>`;
                        break;
                }
                
                html += `
                        <td>${stat.softCount}</td>
                        <td>$${formatNumber(stat.softTVL)}</td>
                        <td>$${formatNumber(stat.softDebt)}</td>
                        <td>${stat.hardCount}</td>
                        <td>$${formatNumber(stat.hardDebt)}</td>
                        <td style="color: green">${Math.max(0, stat.softCount - stat.hardCount + (stat.hardDuplicates || 0))}</td>
                        <td style="color: ${protectedColor}">
                            $${formatNumber(Math.abs(protected))} 
                            (${protectedPercent.toFixed(1)}%)
                        </td>
                    </tr>
                `;
            });

            html += '</tbody></table>';
            container.innerHTML = html;
            
            // Check if table needs scrolling on mobile
            setTimeout(() => {
                const table = container.querySelector('table');
                const indicator = document.getElementById('scrollHintComparison');
                if (table && indicator && window.innerWidth <= 768) {
                    if (table.scrollWidth > table.clientWidth) {
                        indicator.style.display = 'block';
                    } else {
                        indicator.style.display = 'none';
                    }
                }
            }, 100);
            
            renderPagination(statsArray.length);
        }

        function renderPagination(totalItems) {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            
            if (totalPages <= 1) {
                pagination.style.display = 'none';
                return;
            }
            
            let html = '';
            
            // Кнопка "Предыдущая"
            html += `<button class="page-btn" onclick="changePage(${currentPage - 1})" 
                     ${currentPage === 1 ? 'disabled' : ''}>◀</button>`;
            
            // Номера страниц
            const maxButtons = 7;
            let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
            let endPage = Math.min(totalPages, startPage + maxButtons - 1);
            
            if (endPage - startPage < maxButtons - 1) {
                startPage = Math.max(1, endPage - maxButtons + 1);
            }
            
            if (startPage > 1) {
                html += `<button class="page-btn" onclick="changePage(1)">1</button>`;
                if (startPage > 2) html += '<span>...</span>';
            }
            
            for (let i = startPage; i <= endPage; i++) {
                html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" 
                         onclick="changePage(${i})">${i}</button>`;
            }
            
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += '<span>...</span>';
                html += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
            }
            
            // Кнопка "Следующая"
            html += `<button class="page-btn" onclick="changePage(${currentPage + 1})" 
                     ${currentPage === totalPages ? 'disabled' : ''}>▶</button>`;
            
            // Информация о странице
            html += `<span class="page-info">${t('pageText')} ${currentPage} ${t('ofPages')} ${totalPages} 
                     (${totalItems} ${t('records')})</span>`;
            
            pagination.innerHTML = html;
            pagination.style.display = 'flex';
        }

        function changePage(page) {
            currentPage = page;
            renderData();
            window.scrollTo(0, 0);
        }
        
        function sortTable(column) {
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'desc';
            }
            currentPage = 1;
            renderData();
        }
        
        function getSortArrow(column) {
            if (sortColumn !== column) return '';
            return sortDirection === 'asc' ? '↑' : '↓';
        }
        
        function sortHardTable(column) {
            if (hardSortColumn === column) {
                hardSortDirection = hardSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                hardSortColumn = column;
                hardSortDirection = 'desc';
            }
            currentPage = 1;
            renderData();
        }
        
        function getHardSortArrow(column) {
            if (hardSortColumn !== column) return '';
            return hardSortDirection === 'asc' ? '↑' : '↓';
        }
        
        function sortCompareTable(column) {
            if (compareSortColumn === column) {
                compareSortDirection = compareSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                compareSortColumn = column;
                compareSortDirection = 'desc';
            }
            currentPage = 1;
            renderData();
        }
        
        window.applyMainDateFilter = function() {
            const startInput = document.getElementById('mainDateStart');
            const endInput = document.getElementById('mainDateEnd');
            
            if (startInput.value) {
                tableDateStart = new Date(startInput.value);
                selectedStartDate = tableDateStart;
            }
            if (endInput.value) {
                tableDateEnd = new Date(endInput.value);
                selectedEndDate = tableDateEnd;
            }
            
            // Обновляем слайдер чтобы он соответствовал выбранным датам
            updateSliderFromDates();
            
            // Применяем фильтр ко всем вкладкам
            applyFilters();
            renderChart();
            document.getElementById('mainDatePicker').classList.remove('active');
        }
        
        window.resetMainDateFilter = function() {
            document.getElementById('mainDateStart').value = '';
            document.getElementById('mainDateEnd').value = '';
            tableDateStart = null;
            tableDateEnd = null;
            
            // Сбрасываем слайдер на полный период
            const totalDays = parseInt(rangeEnd.max);
            rangeStart.value = 0;
            rangeEnd.value = totalDays;
            
            // Обновляем визуальный диапазон
            const startPercent = (rangeStart.value / totalDays) * 100;
            const endPercent = (rangeEnd.value / totalDays) * 100;
            sliderRange.style.left = startPercent + '%';
            sliderRange.style.width = (endPercent - startPercent) + '%';
            
            // Обновляем selectedStartDate и selectedEndDate
            const minDate = globalMinDate || new Date();
            const maxDate = globalMaxDate || new Date();
            const dayRange = (maxDate - minDate) / (24 * 60 * 60 * 1000);
            const max = parseInt(rangeStart.max);
            selectedStartDate = new Date(minDate.getTime() + (parseInt(rangeStart.value) / max) * dayRange * 24 * 60 * 60 * 1000);
            selectedEndDate = new Date(minDate.getTime() + (parseInt(rangeEnd.value) / max) * dayRange * 24 * 60 * 60 * 1000);
            
            applyFilters();
            renderChart();
            document.getElementById('mainDatePicker').classList.remove('active');
        }
        
        window.toggleDatePicker = function(type) {
            let pickerId;
            if (type === 'main') {
                pickerId = 'mainDatePicker';
            } else if (type === 'soft') {
                pickerId = 'softDatePicker';
            } else {
                pickerId = 'hardDatePicker';
            }
            const picker = document.getElementById(pickerId);
            if (picker) {
                picker.classList.toggle('active');
                // Закрываем другой календарь если открыт
                const otherId = type === 'soft' ? 'hardDatePicker' : 'softDatePicker';
                const otherPicker = document.getElementById(otherId);
                if (otherPicker) {
                    otherPicker.classList.remove('active');
                }
            }
        }
        
        function getCompareSortArrow(column) {
            if (compareSortColumn !== column) return '';
            return compareSortDirection === 'asc' ? '↑' : '↓';
        }

        function formatNumber(num) {
            if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
            if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
            if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
            return num.toFixed(2);
        }

        function formatAddress(address) {
            if (!address) return 'N/A';
            return address.slice(0, 6) + '...' + address.slice(-4);
        }
        
        function formatDateTime(dateStr) {
            if (!dateStr) return 'N/A';
            const date = new Date(dateStr);
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };
            return date.toLocaleString('ru-RU', options);
        }
        
        function formatDuration(hours) {
            const roundedHours = Math.round(hours * 10) / 10; // Округляем до 1 знака после запятой
            if (roundedHours < 24) {
                return `${roundedHours.toFixed(1)} ч`;
            } else {
                const days = Math.floor(roundedHours / 24);
                const remainingHours = Math.round(roundedHours % 24);
                if (remainingHours === 0) {
                    return `${days}д`;
                }
                return `${days}д ${remainingHours}ч`;
            }
        }

        function showError(message) {
            const dataTable = document.getElementById('dataTable');
            dataTable.innerHTML = `<div class="error">${message}</div>`;
        }

        // Функции для работы с календарем
        let currentDatePickerType = null; // 'start' или 'end'
        
        window.openDatePicker = function(type) {
            currentDatePickerType = type;
            const datePickerPopup = document.getElementById('datePickerPopup');
            const datePickerInput = document.getElementById('datePickerInput');
            const label = document.getElementById(type + 'Label');
            
            // Обновляем текст кнопок в зависимости от языка
            document.getElementById('applyDateBtn').textContent = t('apply');
            document.getElementById('cancelDateBtn').textContent = t('cancel');
            
            // Устанавливаем текущую дату в input
            const currentDate = type === 'start' ? selectedStartDate : selectedEndDate;
            if (currentDate) {
                datePickerInput.value = currentDate.toISOString().split('T')[0];
            }
            
            // Позиционируем календарь под лейблом
            const rect = label.getBoundingClientRect();
            const container = label.closest('.combined-container');
            const containerRect = container.getBoundingClientRect();
            
            // Вычисляем позицию относительно контейнера
            let leftPos = rect.left - containerRect.left;
            const topPos = rect.bottom - containerRect.top + 5;
            
            // Для правой даты (end) сдвигаем влево на 70px
            if (type === 'end') {
                leftPos = leftPos - 70;
            }
            
            datePickerPopup.style.left = leftPos + 'px';
            datePickerPopup.style.top = topPos + 'px';
            datePickerPopup.style.display = 'block';
        }
        
        window.closeDatePicker = function() {
            document.getElementById('datePickerPopup').style.display = 'none';
            currentDatePickerType = null;
        }
        
        window.applyDateFromPicker = function() {
            const datePickerInput = document.getElementById('datePickerInput');
            const selectedDate = new Date(datePickerInput.value);
            
            if (!selectedDate || isNaN(selectedDate.getTime())) {
                alert(t('selectValidDate'));
                return;
            }
            
            // Обновляем соответствующую дату
            if (currentDatePickerType === 'start') {
                selectedStartDate = selectedDate;
                tableDateStart = selectedDate;
            } else if (currentDatePickerType === 'end') {
                selectedEndDate = selectedDate;
                tableDateEnd = selectedDate;
            }
            
            // Обновляем слайдер в соответствии с выбранными датами
            updateSliderFromDates();
            
            // Закрываем календарь
            closeDatePicker();
            
            // Применяем фильтры
            if (typeof applyFilters === 'function') {
                applyFilters();
            }
        }
        
        // Автозагрузка при открытии страницы
        window.addEventListener('DOMContentLoaded', async () => {
            // Initialize language button states based on saved language
            const enBtn = document.getElementById('langEn');
            const ruBtn = document.getElementById('langRu');
            if (currentLang === 'ru') {
                ruBtn.style.background = 'white';
                ruBtn.style.color = '#333';
                enBtn.style.background = 'rgba(255,255,255,0.2)';
                enBtn.style.color = 'white';
            } else {
                enBtn.style.background = 'white';
                enBtn.style.color = '#333';
                ruBtn.style.background = 'rgba(255,255,255,0.2)';
                ruBtn.style.color = 'white';
            }
            
            // Добавляем обработчики для двустороннего слайдера
            const rangeStart = document.getElementById('rangeStart');
            const rangeEnd = document.getElementById('rangeEnd');
            const sliderRange = document.getElementById('sliderRange');
            const startLabel = document.getElementById('startLabel');
            const endLabel = document.getElementById('endLabel');
            
            function updateSliderRange() {
                const start = parseInt(rangeStart.value);
                const end = parseInt(rangeEnd.value);
                const max = parseInt(rangeStart.max);
                
                // Не даем слайдерам пересекаться
                if (start >= end) {
                    if (this === rangeStart) {
                        rangeStart.value = end - 1;
                    } else {
                        rangeEnd.value = start + 1;
                    }
                    return;
                }
                
                // Обновляем визуальный диапазон
                const startPercent = (start / max) * 100;
                const endPercent = (end / max) * 100;
                sliderRange.style.left = startPercent + '%';
                sliderRange.style.width = (endPercent - startPercent) + '%';
                
                // Обновляем метки с учетом текущего диапазона дат (фильтрованных или полных)
                let minDate = new Date();
                let maxDate = new Date(0);
                
                // Используем отфильтрованные данные если есть
                const softToUse = filteredSoftData || softData;
                const hardToUse = filteredHardData || hardData;
                
                if (softToUse && softToUse.positions) {
                    softToUse.positions.forEach(pos => {
                        if (pos.first_dt) {
                            const date = new Date(pos.first_dt);
                            if (date < minDate) minDate = date;
                            if (date > maxDate) maxDate = date;
                        }
                    });
                }
                
                if (hardToUse && hardToUse.events) {
                    hardToUse.events.forEach(event => {
                        if (event.timestamp) {
                            const date = new Date(event.timestamp);
                            if (date < minDate) minDate = date;
                            if (date > maxDate) maxDate = date;
                        }
                    });
                }
                
                // Если данных нет, используем глобальный диапазон
                if (minDate > maxDate && globalMinDate && globalMaxDate) {
                    minDate = globalMinDate;
                    maxDate = globalMaxDate;
                }
                
                // Вычисляем и сохраняем выбранные даты
                const dayRange = (maxDate - minDate) / (24 * 60 * 60 * 1000);
                selectedStartDate = new Date(minDate.getTime() + (start / max) * dayRange * 24 * 60 * 60 * 1000);
                selectedEndDate = new Date(minDate.getTime() + (end / max) * dayRange * 24 * 60 * 60 * 1000);
                
                // Обновляем глобальные переменные для фильтрации таблицы
                tableDateStart = selectedStartDate;
                tableDateEnd = selectedEndDate;
                
                // Обновляем Date Filter чтобы он соответствовал слайдеру
                const mainDateStart = document.getElementById('mainDateStart');
                const mainDateEnd = document.getElementById('mainDateEnd');
                if (mainDateStart) {
                    mainDateStart.value = selectedStartDate.toISOString().split('T')[0];
                }
                if (mainDateEnd) {
                    mainDateEnd.value = selectedEndDate.toISOString().split('T')[0];
                }
                
                const locale = currentLang === 'en' ? 'en-US' : 'ru-RU';
                startLabel.textContent = selectedStartDate.toLocaleDateString(locale, {day: 'numeric', month: 'short', year: '2-digit'});
                endLabel.textContent = selectedEndDate.toLocaleDateString(locale, {day: 'numeric', month: 'short', year: '2-digit'});
                
                // Перерисовываем график и данные таблицы
                renderStats();
            // Update the inline protection chart after stats are rendered
            setTimeout(() => updateProtectionChartInline(), 100);  // Обновляем блоки статистики
                renderChart();
                renderData();  // Обновляем таблицу и диаграммы с учетом нового диапазона дат
                updateFilterStats();  // Обновляем счетчик отфильтрованных данных
                updateProtectionChart();  // Обновляем диаграмму защиты
            }
            
            // Функция для обновления слайдера на основе выбранных дат
            function updateSliderFromDates() {
                if (!selectedStartDate || !selectedEndDate) return;
                
                // Находим минимальную и максимальную даты в данных
                let minDate = globalMinDate || new Date();
                let maxDate = globalMaxDate || new Date();
                
                // Вычисляем позиции слайдера
                const totalDays = Math.ceil((maxDate - minDate) / (24 * 60 * 60 * 1000)) + 1;
                const startDay = Math.max(0, Math.floor((selectedStartDate - minDate) / (24 * 60 * 60 * 1000)));
                const endDay = Math.min(totalDays, Math.ceil((selectedEndDate - minDate) / (24 * 60 * 60 * 1000)));
                
                // Обновляем слайдер
                rangeStart.value = startDay;
                rangeEnd.value = endDay;
                
                // Обновляем визуальный диапазон
                const startPercent = (startDay / totalDays) * 100;
                const endPercent = (endDay / totalDays) * 100;
                sliderRange.style.left = startPercent + '%';
                sliderRange.style.width = (endPercent - startPercent) + '%';
            }
            window.updateSliderFromDates = updateSliderFromDates;
            
            rangeStart.addEventListener('input', updateSliderRange);
            rangeEnd.addEventListener('input', updateSliderRange);
            
            try {
                await loadScriptByName('latest_liquidations.js');
                if (window.SOFT_LIQUIDATIONS_DATA) {
                    processLoadedData(window.SOFT_LIQUIDATIONS_DATA);
                    const fileNameElement = document.getElementById('fileName');
                    if (fileNameElement) {
                        fileNameElement.textContent = currentLang === 'en' ? 'latest_liquidations.js loaded' : 'latest_liquidations.js загружен';
                    }
                }
            } catch (error) {
                const fileNameElement = document.getElementById('fileName');
                if (fileNameElement) {
                    fileNameElement.textContent = currentLang === 'en' ? 'Select file to load' : 'Выберите файл для загрузки';
                }
            }
        });
        
        // Helper function to setup canvas for high DPI displays (moved here to be available for all functions)
        function setupHighDPICanvas(canvas, width, height) {
            const dpr = window.devicePixelRatio || 1;
            
            // Set the actual dimensions
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            
            // Scale the canvas back down using CSS
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            // Scale the drawing context so everything draws at the correct size
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            
            return ctx;
        }
        
        // Function to update the protection chart
        /* Removed duplicate updateProtectionChartInline - using updateProtectionChart instead */
        function updateProtectionChartInline_REMOVED() {
            const canvas = document.getElementById('protectionChartInline');
            if (!canvas) return;
            
            // Read values directly from the protection card to ensure consistency
            const protectionCard = document.querySelector('.stat-card.protection');
            if (!protectionCard) return;
            
            // Check if card has negative class (this determines the background color)
            const isCardNegative = protectionCard.classList.contains('negative');
            
            // Extract the displayed values from the card
            const valueElement = protectionCard.querySelector('.stat-value');
            const percentElement = protectionCard.querySelector('.protection-percent span');
            
            let protectedAmount = 0;
            let protectionPercent = 0;
            
            // Parse the displayed value (it's always positive in display, check card class for sign)
            if (valueElement) {
                const displayedValue = valueElement.textContent.replace(/[^0-9.]/g, '');
                protectedAmount = parseFloat(displayedValue) || 0;
                if (isCardNegative) {
                    protectedAmount = -protectedAmount;
                }
            }
            
            // Parse the percentage from the displayed text
            if (percentElement) {
                const percentMatch = percentElement.textContent.match(/-?\d+\.?\d*/);
                if (percentMatch) {
                    protectionPercent = parseFloat(percentMatch[0]);
                }
            }
            
            // Set canvas size with high DPI support
            const width = 150;
            const height = 150;
            const ctx = setupHighDPICanvas(canvas, width, height);
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2 - 12;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Draw background circle (track)
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 16;
            ctx.stroke();
            
            // Draw protection arc only if percentage > 0
            if (protectionPercent && protectionPercent > 0) {
                const startAngle = -Math.PI / 2;
                const endAngle = startAngle + (2 * Math.PI * protectionPercent / 100);
                
                console.log('Drawing arc for', protectionPercent + '%');
                
                // Create gradient for the arc - match the card's background color
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                const theme = localStorage.getItem('theme') || 'light';
                
                if (!isCardNegative) {  // Use card's state directly
                    if (theme === 'chad') {
                        // Purple gradient for Chad theme
                        gradient.addColorStop(0, '#9171d8');
                        gradient.addColorStop(1, '#6b46c1');
                    } else {
                        // White to light gray for positive protection (green background)
                        gradient.addColorStop(0, '#ffffff');
                        gradient.addColorStop(1, '#f0f0f0');
                    }
                } else {
                    if (theme === 'chad') {
                        // Darker purple for negative in Chad theme
                        gradient.addColorStop(0, '#7a5bc0');
                        gradient.addColorStop(1, '#553399');
                    } else {
                        // Red tones for negative protection (red background)
                        gradient.addColorStop(0, '#ff6b6b');
                        gradient.addColorStop(1, '#ff4444');
                    }
                }
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 16;
                ctx.lineCap = 'round';
                ctx.stroke();
            } else {
                console.log('No percentage to draw - value is:', protectionPercent);
            }
            
        }
        
        // Compatibility wrapper for old function name
        
        // Function to switch distribution chart type
        function switchDistributionChart(type) {
            // Update radio button
            const radio = document.querySelector(`input[name="distributionType"][value="${type}"]`);
            if (radio) {
                radio.checked = true;
            }
            
            // Draw the selected chart - use pie chart instead of treemap
            if (window.chartData && window.chartData[type]) {
                // Determine chart type based on current tab
                let chartType;
                if (currentTab === 'hard') {
                    chartType = 'hard';
                } else if (currentTab === 'comparison') {
                    chartType = 'comparison';
                } else {
                    chartType = 'soft';
                }
                drawPieChartWithLabels('distributionChart', window.chartData[type], chartType);
            }
        }
        
        // Function to draw treemap chart for distributions (like stock market apps)
        function drawRectChart(containerId, data) {
            const container = document.getElementById(containerId);
            if (!container || !data || data.length === 0) return;
            
            // Clear container
            container.innerHTML = '';
            
            // Calculate total and percentages
            const total = data.reduce((sum, item) => sum + item.value, 0);
            if (total === 0) return;
            
            // Sort data by value (descending)
            const sortedData = [...data].sort((a, b) => b.value - a.value);
            
            // Take top 10 items for better layout
            const displayData = sortedData.slice(0, 10);
            
            // Colors palette - green for largest, distinct colors for others
            const theme = localStorage.getItem('theme') || 'light';
            const colors = theme === 'chad' ? [
                '#6b46c1', // main purple
                '#7a5bc0', // lighter purple
                '#9171d8', // light purple
                '#a084e8', // soft purple
                '#b19cd9', // lavender
                '#c9b3f5', // light lavender
                '#d8c8f0', // very light purple
                '#553399', // dark purple
                '#8b7cc7', // medium purple
                '#9f8fd4', // medium light purple
            ] : [
                '#0066ff', // bright blue accent for #1
                '#4d94ff', // lighter blue
                '#80b3ff', // soft blue
                '#94a3b8', // muted blue-gray
                '#64748b', // slate
                '#8b99a8', // light slate
                '#a8b5c4', // lighter slate
                '#475569', // darker slate
                '#6b7c8f', // medium slate
                '#7d8fa3', // medium light slate
                '#5a6b7e', // medium dark slate
                '#99ccff', // pale blue
                '#b3d9ff', // very pale blue
                '#667785', // gray-blue
                '#8899aa', // light gray-blue
                '#aabbcc'  // pale gray-blue
            ];
            
            // Container dimensions
            const containerWidth = 290;
            const containerHeight = 280;
            
            // Create treemap container
            const treemapContainer = document.createElement('div');
            treemapContainer.style.cssText = `
                width: ${containerWidth}px;
                height: ${containerHeight}px;
                position: relative;
                background: rgba(255,255,255,0.05);
                border-radius: 6px;
            `;
            
            // Simple treemap algorithm - squarified layout
            function squarify(data, x, y, width, height) {
                if (data.length === 0) return;
                
                if (data.length === 1) {
                    const item = data[0];
                    const percentage = (item.value / total) * 100;
                    const rect = createRect(item, colors[item.index % colors.length], x, y, width, height, percentage);
                    treemapContainer.appendChild(rect);
                    return;
                }
                
                // Split into two groups
                const totalValue = data.reduce((sum, item) => sum + item.value, 0);
                const mid = Math.floor(data.length / 2);
                
                let sum1 = 0;
                for (let i = 0; i < mid; i++) {
                    sum1 += data[i].value;
                }
                
                const ratio1 = sum1 / totalValue;
                
                if (width > height) {
                    // Split vertically
                    const w1 = width * ratio1;
                    squarify(data.slice(0, mid), x, y, w1, height);
                    squarify(data.slice(mid), x + w1, y, width - w1, height);
                } else {
                    // Split horizontally  
                    const h1 = height * ratio1;
                    squarify(data.slice(0, mid), x, y, width, h1);
                    squarify(data.slice(mid), x, y + h1, width, height - h1);
                }
            }
            
            function createRect(item, color, x, y, width, height, percentage) {
                const rect = document.createElement('div');
                
                rect.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${width}px;
                    height: ${height}px;
                    background: ${color};
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-size: ${Math.min(Math.max(width / 12, 8), 12)}px;
                    font-weight: 600;
                    text-align: center;
                    padding: 4px;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
                    transition: all 0.2s ease;
                    cursor: pointer;
                    overflow: hidden;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                    box-sizing: border-box;
                `;
                
                // Add hover effect with tooltip
                rect.addEventListener('mouseenter', (e) => {
                    rect.style.transform = 'scale(1.05)';
                    rect.style.zIndex = '10';
                    rect.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.3)';
                    
                    // Create tooltip
                    const tooltip = document.createElement('div');
                    tooltip.id = 'treemap-tooltip';
                    tooltip.style.cssText = `
                        position: fixed;
                        background: rgba(0,0,0,0.9);
                        color: white;
                        padding: 12px;
                        border-radius: 8px;
                        font-size: 12px;
                        line-height: 1.4;
                        max-width: 200px;
                        z-index: 1000;
                        pointer-events: none;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                        border: 1px solid rgba(255,255,255,0.1);
                        backdrop-filter: blur(10px);
                    `;
                    
                    // Format both count and dollar values
                    const countValue = item.count ? item.count.toLocaleString('en-US') : item.value.toLocaleString('en-US');
                    const dollarValue = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(item.dollars || item.value);
                    
                    // Show both count and dollars
                    tooltip.innerHTML = `
                        <div style="font-weight: 600; margin-bottom: 6px; color: ${color};">${item.label}</div>
                        <div style="margin-bottom: 3px;">${t('count')}: <strong>${countValue}</strong></div>
                        <div style="margin-bottom: 3px;">${currentTab === 'comparison' ? (t('protected') || 'Protected') : t('value')}: <strong>${dollarValue}</strong></div>
                        <div style="margin-bottom: 3px;">${t('share')}: <strong>${percentage.toFixed(2)}%</strong></div>
                        <div style="font-size: 11px; opacity: 0.8;">Rank: #${item.index + 1}</div>
                    `;
                    
                    document.body.appendChild(tooltip);
                    
                    // Position tooltip
                    const updateTooltipPosition = (event) => {
                        const rect = tooltip.getBoundingClientRect();
                        const x = event.clientX + 10;
                        const y = event.clientY - rect.height - 10;
                        
                        // Keep tooltip within viewport
                        const finalX = Math.min(x, window.innerWidth - rect.width - 10);
                        const finalY = Math.max(y, 10);
                        
                        tooltip.style.left = finalX + 'px';
                        tooltip.style.top = finalY + 'px';
                    };
                    
                    updateTooltipPosition(e);
                    
                    // Update position on mouse move
                    rect._mouseMoveHandler = updateTooltipPosition;
                    rect.addEventListener('mousemove', rect._mouseMoveHandler);
                });
                
                rect.addEventListener('mouseleave', () => {
                    rect.style.transform = 'scale(1)';
                    rect.style.zIndex = '1';
                    rect.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1)';
                    
                    // Remove tooltip
                    const tooltip = document.getElementById('treemap-tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                    
                    // Remove mouse move handler
                    if (rect._mouseMoveHandler) {
                        rect.removeEventListener('mousemove', rect._mouseMoveHandler);
                        rect._mouseMoveHandler = null;
                    }
                });
                
                // Only show text if rectangle is big enough
                if (width > 40 && height > 25) {
                    // Create label
                    const label = document.createElement('div');
                    let displayName = item.label;
                    if (width < 80 && displayName.length > 6) {
                        displayName = displayName.substring(0, 6) + '...';
                    } else if (displayName.length > 10) {
                        displayName = displayName.substring(0, 10) + '...';
                    }
                    label.textContent = displayName;
                    label.style.cssText = `
                        font-size: ${Math.min(Math.max(width / 15, 8), 11)}px;
                        line-height: 1.1;
                        margin-bottom: 2px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 100%;
                    `;
                    
                    // Create percentage - only if there's space
                    if (height > 40) {
                        const percent = document.createElement('div');
                        percent.textContent = `${percentage.toFixed(1)}%`;
                        percent.style.cssText = `
                            font-size: ${Math.min(Math.max(width / 18, 7), 10)}px;
                            font-weight: 700;
                            opacity: 0.9;
                        `;
                        rect.appendChild(label);
                        rect.appendChild(percent);
                    } else {
                        rect.appendChild(label);
                    }
                } else if (width > 25 && height > 15) {
                    // Very small - just percentage
                    const percent = document.createElement('div');
                    percent.textContent = `${percentage.toFixed(0)}%`;
                    percent.style.cssText = `
                        font-size: 8px;
                        font-weight: 700;
                    `;
                    rect.appendChild(percent);
                }
                
                return rect;
            }
            
            // Add indexes to data for color consistency
            const indexedData = displayData.map((item, index) => ({ ...item, index }));
            
            // Start recursive layout
            squarify(indexedData, 0, 0, containerWidth, containerHeight);
            
            container.appendChild(treemapContainer);
        }

        // COMPLETELY REWRITTEN PIE CHART FUNCTION
        function drawPieChartWithLabels(canvasId, data, chartType) {
            const canvas = document.getElementById(canvasId);
            if (!canvas || !data || data.length === 0) return;
            
            // Configuration
            const width = 280;
            const height = 260;
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2 - 20;
            
            // Setup high DPI canvas
            const ctx = setupHighDPICanvas(canvas, width, height);
            ctx.clearRect(0, 0, width, height);
            
            // Prepare data: sort and create segments
            const sortedData = [...data]
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value);
            
            // Create segments array with top 8 + others
            const segments = [];
            const topItems = sortedData.slice(0, 8);
            const remainingItems = sortedData.slice(8);
            
            // Add top items
            topItems.forEach(item => segments.push({...item}));
            
            // Add "Others" segment if needed
            if (remainingItems.length > 0) {
                const othersValue = remainingItems.reduce((sum, item) => sum + item.value, 0);
                const othersCount = remainingItems.reduce((sum, item) => sum + (item.count || 1), 0);
                const othersDollars = remainingItems.reduce((sum, item) => sum + (item.dollars || item.value), 0);
                
                segments.push({
                    label: t('others') || 'Others',
                    value: othersValue,
                    count: othersCount,
                    dollars: othersDollars,
                    items: remainingItems,
                    isOthers: true
                });
            }
            
            // Calculate total from segments (ensures consistency)
            const total = segments.reduce((sum, seg) => sum + seg.value, 0);
            if (total === 0) return;
            
            // Color palette
            const theme = localStorage.getItem('theme') || 'light';
            const colors = theme === 'chad' ? [
                '#6b46c1', // main purple
                '#7a5bc0', // lighter purple
                '#9171d8', // light purple
                '#a084e8', // soft purple
                '#b19cd9', // lavender
                '#c9b3f5', // light lavender
                '#d8c8f0', // very light purple
                '#553399'  // dark purple
            ] : [
                '#0066ff', // bright blue accent for #1
                '#4d94ff', // lighter blue
                '#80b3ff', // soft blue
                '#94a3b8', // muted blue-gray
                '#64748b', // slate
                '#8b99a8', // light slate
                '#a8b5c4', // lighter slate
                '#475569'  // darker slate
            ];
            
            // Store segment angles for hover detection
            const segmentAngles = [];
            let startAngle = -Math.PI / 2; // Start from top
            
            // Draw all segments
            segments.forEach((segment, index) => {
                const segmentValue = segment.value;
                const angle = (segmentValue / total) * 2 * Math.PI;
                const endAngle = startAngle + angle;
                
                // Store angles for hover detection
                segmentAngles.push({
                    startAngle: startAngle,
                    endAngle: endAngle,
                    segment: segment,
                    color: segment.isOthers ? '#555' : colors[index % colors.length],
                    percentage: (segmentValue / total) * 100
                });
                
                // Draw segment with shadow
                ctx.save();
                
                // Add shadow for depth (like bar chart)
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 4;
                
                // Draw segment
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.closePath();
                
                // Fill with color
                const segmentColor = segment.isOthers ? '#555' : colors[index % colors.length];
                ctx.fillStyle = segmentColor;
                ctx.fill();
                
                // Remove shadow for border
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                
                ctx.restore();
                
                // Draw label for segments > 5%
                const percentage = (segmentValue / total) * 100;
                if (percentage > 5) {
                    const labelAngle = startAngle + angle / 2;
                    const labelRadius = radius * 0.7;
                    const labelX = centerX + Math.cos(labelAngle) * labelRadius;
                    const labelY = centerY + Math.sin(labelAngle) * labelRadius;
                    
                    // Draw text with shadow
                    ctx.save();
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 11px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 3;
                    
                    // Label text
                    const labelText = segment.label.length > 10 ? 
                        segment.label.substring(0, 10) + '...' : 
                        segment.label;
                    ctx.fillText(labelText, labelX, labelY - 6);
                    
                    // Percentage
                    ctx.font = '10px Arial';
                    ctx.fillText(`${percentage.toFixed(1)}%`, labelX, labelY + 6);
                    ctx.restore();
                }
                
                startAngle = endAngle;
            });
            
            // Store data for hover detection
            canvas.pieData = {
                segments: segmentAngles,
                centerX: centerX,
                centerY: centerY,
                radius: radius,
                chartType: chartType
            };
            
            // Remove old event listeners
            canvas.onmousemove = null;
            canvas.onmouseleave = null;
            
            // Add new hover handler
            canvas.addEventListener('mousemove', function(e) {
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) * (width / rect.width);
                const y = (e.clientY - rect.top) * (height / rect.height);
                
                // Check if mouse is over pie
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance <= radius && canvas.pieData) {
                    // Calculate angle
                    let mouseAngle = Math.atan2(dy, dx);
                    // Normalize to 0-2π range starting from top
                    mouseAngle = mouseAngle + Math.PI / 2;
                    if (mouseAngle < 0) mouseAngle += 2 * Math.PI;
                    if (mouseAngle > 2 * Math.PI) mouseAngle -= 2 * Math.PI;
                    
                    // Find which segment
                    for (let segData of canvas.pieData.segments) {
                        let start = segData.startAngle + Math.PI / 2;
                        let end = segData.endAngle + Math.PI / 2;
                        
                        // Normalize angles
                        if (start < 0) start += 2 * Math.PI;
                        if (end < 0) end += 2 * Math.PI;
                        
                        // Check if mouse angle is within segment
                        let inSegment = false;
                        if (start <= end) {
                            inSegment = mouseAngle >= start && mouseAngle <= end;
                        } else {
                            // Segment crosses 0
                            inSegment = mouseAngle >= start || mouseAngle <= end;
                        }
                        
                        if (inSegment) {
                            canvas.style.cursor = 'pointer';
                            const chartType = canvas.pieData?.chartType || null;
                            showTooltip(e, segData.segment, segData.percentage, chartType);
                            return;
                        }
                    }
                }
                
                // Not hovering over pie
                canvas.style.cursor = 'default';
                hideTooltip();
            });
            
            canvas.addEventListener('mouseleave', function() {
                canvas.style.cursor = 'default';
                hideTooltip();
            });
        }
        
        // Helper function to adjust color brightness
        function adjustColorBrightness(color, percent) {
            const num = parseInt(color.replace("#", ""), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) + amt;
            const G = (num >> 8 & 0x00FF) + amt;
            const B = (num & 0x0000FF) + amt;
            return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
        }
        
        // Tooltip functions for pie chart
        let currentTooltip = null;
        
        function showTooltip(event, item, percentage, chartType) {
            hideTooltip(); // Remove any existing tooltip
            
            const tooltip = document.createElement('div');
            tooltip.id = 'pie-tooltip';
            
            // Get current theme
            const currentTheme = localStorage.getItem('theme') || 'light';
            
            // Theme-specific styles
            let tooltipStyles = '';
            if (currentTheme === 'light') {
                tooltipStyles = `
                    position: fixed;
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    color: #333333;
                    padding: 14px;
                    border-radius: 0;
                    font-size: 12px;
                    line-height: 1.5;
                    z-index: 1000;
                    pointer-events: none;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                    border: 1px solid #e0e0e0;
                    max-width: 220px;
                `;
            } else if (currentTheme === 'dark') {
                tooltipStyles = `
                    position: fixed;
                    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                    color: #ffffff;
                    padding: 14px;
                    border-radius: 0;
                    font-size: 12px;
                    line-height: 1.5;
                    z-index: 1000;
                    pointer-events: none;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.5);
                    border: 1px solid #444444;
                    backdrop-filter: blur(10px);
                    max-width: 220px;
                `;
            } else if (currentTheme === 'chad') {
                tooltipStyles = `
                    position: fixed;
                    background: linear-gradient(135deg, rgba(107, 70, 193, 0.95) 0%, rgba(122, 91, 192, 0.95) 100%);
                    color: #ffffff;
                    padding: 14px;
                    border-radius: 0;
                    font-size: 12px;
                    line-height: 1.5;
                    z-index: 1000;
                    pointer-events: none;
                    box-shadow: 0 6px 20px rgba(107, 70, 193, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    max-width: 220px;
                `;
            }
            
            tooltip.style.cssText = tooltipStyles;
            
            // Determine chart type label and colors based on theme
            let typeLabel = '';
            let typeColor = '#22c55e';
            let borderColor = 'rgba(255,255,255,0.2)';
            let labelColor = '#888';
            let strongColor = '#22c55e';
            
            // Adjust colors based on theme
            if (currentTheme === 'light') {
                borderColor = 'rgba(0,0,0,0.1)';
                labelColor = '#666666';
                strongColor = '#0066ff';
            } else if (currentTheme === 'dark') {
                borderColor = 'rgba(255,255,255,0.1)';
                labelColor = '#aaaaaa';
                strongColor = '#4d94ff';
            } else if (currentTheme === 'chad') {
                borderColor = 'rgba(255,255,255,0.2)';
                labelColor = '#ffffff';
                strongColor = '#ffffff';
            }
            
            // Try to determine chart type from context
            const canvasId = event.target?.id || '';
            const isProtectionChart = canvasId.includes('protection');
            const distributionType = document.querySelector('input[name="distributionType"]:checked')?.value;
            
            if (chartType === 'comparison' || isProtectionChart) {
                const protectionText = t('protectedFromLiquidation') || 'Protected from Liquidation';
                typeLabel = protectionText.replace('🛡️', '').trim();
                typeColor = currentTheme === 'chad' ? '#ffffff' : '#3b82f6';
            } else if (chartType === 'soft' || distributionType === 'soft') {
                typeLabel = t('softLiquidations') || 'Soft Liquidations';
                typeColor = currentTheme === 'chad' ? '#e0e0e0' : '#22c55e';
            } else if (chartType === 'hard' || distributionType === 'hard') {
                typeLabel = t('hardLiquidations') || 'Hard Liquidations';
                typeColor = currentTheme === 'chad' ? '#cccccc' : '#ff6b6b';
            }
            
            // Format both count and dollar values
            const countValue = item.count ? item.count.toLocaleString('en-US') : item.value.toLocaleString('en-US');
            const dollarValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(item.dollars || item.value);
            
            // Check if this is the "Others" item
            if (item.isOthers && item.items) {
                // Show detailed info for Others
                let detailsHtml = '';
                const topItems = item.items.slice(0, 5); // Show top 5 items
                topItems.forEach(subItem => {
                    const subPercent = ((subItem.value / item.value) * 100).toFixed(1);
                    detailsHtml += `
                        <div style="margin-left: 10px; font-size: 10px; opacity: 0.8;">
                            • ${subItem.label}: ${subPercent}%
                        </div>
                    `;
                });
                if (item.items.length > 5) {
                    const moreText = t('andMore').replace('{count}', item.items.length - 5);
                    detailsHtml += `
                        <div style="margin-left: 10px; font-size: 10px; opacity: 0.6;">
                            ... ${moreText}
                        </div>
                    `;
                }
                
                tooltip.innerHTML = `
                    ${typeLabel ? `<div style="font-size: 11px; font-weight: 600; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid ${borderColor}; color: ${typeColor};">${typeLabel}</div>` : ''}
                    <div style="font-weight: 600; margin-bottom: 6px; color: ${labelColor};">${item.label}</div>
                    <div style="margin-bottom: 3px;">${t('count')}: <strong style="color: ${strongColor};">${countValue}</strong></div>
                    <div style="margin-bottom: 3px;">${currentTab === 'comparison' ? (t('protected') || 'Protected') : t('value')}: <strong style="color: ${strongColor};">${dollarValue}</strong></div>
                    <div style="margin-bottom: 3px;">${t('share')}: <strong style="color: ${strongColor};">${percentage.toFixed(2)}%</strong></div>
                    <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid ${borderColor};">
                        <div style="font-size: 11px; margin-bottom: 4px; opacity: 0.9;">${t('includes')}:</div>
                        ${detailsHtml}
                    </div>
                `;
            } else {
                // Show regular tooltip
                tooltip.innerHTML = `
                    ${typeLabel ? `<div style="font-size: 11px; font-weight: 600; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid ${borderColor}; color: ${typeColor};">${typeLabel}</div>` : ''}
                    <div style="font-weight: 600; margin-bottom: 6px; color: ${strongColor};">${item.label}</div>
                    <div style="margin-bottom: 3px;">${t('count')}: <strong style="color: ${strongColor};">${countValue}</strong></div>
                    <div style="margin-bottom: 3px;">${currentTab === 'comparison' ? (t('protected') || 'Protected') : t('value')}: <strong style="color: ${strongColor};">${dollarValue}</strong></div>
                    <div>${t('share')}: <strong style="color: ${strongColor};">${percentage.toFixed(2)}%</strong></div>
                `;
            }
            
            document.body.appendChild(tooltip);
            currentTooltip = tooltip;
            
            // Position tooltip
            const rect = tooltip.getBoundingClientRect();
            const x = event.clientX + 10;
            const y = event.clientY - rect.height - 10;
            
            const finalX = Math.min(x, window.innerWidth - rect.width - 10);
            const finalY = Math.max(y, 10);
            
            tooltip.style.left = finalX + 'px';
            tooltip.style.top = finalY + 'px';
        }
        
        function hideTooltip() {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }
        }
        
        // Function to draw pie charts for distributions - SIMPLIFIED VERSION
        function drawPieChart(canvasId, data, legendId) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) {
                return;
            }
            
            // Set canvas size
            const width = 300;
            const height = 300;
            
            // Setup high DPI canvas
            const ctx = setupHighDPICanvas(canvas, width, height);
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2 - 60;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            if (!data || data.length === 0) {
                ctx.fillStyle = '#ccc';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(t('noData'), centerX, centerY);
                return;
            }
            
            // Sort data by value (descending) and filter out invalid values
            const sortedData = [...data]
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value);
            
            // Prepare segments (top 8 + others if needed)
            const segments = [];
            const currentTheme = localStorage.getItem('theme') || 'light';
            const colors = currentTheme === 'chad' ? [
                '#6b46c1', '#7a5bc0', '#9171d8', '#a08ae0', '#b5a3e8',
                '#c9bcf0', '#dcd4f7', '#8b73c4', '#9f88d1', '#b39dde'
            ] : [
                '#0066ff', '#4d94ff', '#80b3ff', '#94a3b8', '#64748b',
                '#8b99a8', '#a8b5c4', '#475569', '#6b7c8f', '#7d8fa3'
            ];
            
            // Add top 8 segments
            for (let i = 0; i < Math.min(8, sortedData.length); i++) {
                segments.push({
                    ...sortedData[i],
                    color: colors[i % colors.length],
                    isOthers: false
                });
            }
            
            // Add "Others" segment if there are more than 8 items
            if (sortedData.length > 8) {
                let othersValue = 0;
                let othersCount = 0;
                let othersDollars = 0;
                const othersItems = [];
                
                for (let i = 8; i < sortedData.length; i++) {
                    othersValue += sortedData[i].value;
                    othersCount += sortedData[i].count || 0;
                    othersDollars += sortedData[i].dollars || 0;
                    othersItems.push(sortedData[i]);
                }
                
                if (othersValue > 0) {
                    segments.push({
                        label: t('others') || 'Others',
                        value: othersValue,
                        count: othersCount,
                        dollars: othersDollars,
                        items: othersItems,
                        color: currentTheme === 'chad' ? '#5d4a8a' : '#555',
                        isOthers: true
                    });
                }
            }
            
            // Calculate total from SEGMENTS (not original data) to ensure consistency
            const total = segments.reduce((sum, item) => sum + item.value, 0);
            if (total === 0) return;
            
            // SIMPLIFIED DRAWING - Draw segments covering the red circle
            let currentAngle = -Math.PI / 2; // Start from top
            const labels = [];
            
            
            // Draw each segment
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];
                let sliceAngle;
                
                // For the last segment, make sure it closes the circle exactly
                if (i === segments.length - 1) {
                    sliceAngle = (Math.PI * 2 - Math.PI / 2) - currentAngle;
                } else {
                    sliceAngle = (segment.value / total) * 2 * Math.PI;
                }
                
                const percent = (segment.value / total * 100);
                
                
                // Draw segment
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.lineTo(centerX, centerY);
                ctx.fillStyle = segment.color;
                ctx.fill();
                
                // Store label info for segments >= 3%
                if (percent >= 3) {
                    const labelAngle = currentAngle + sliceAngle / 2;
                    labels.push({
                        text: segment.label || 'Unknown',
                        percent: `${percent.toFixed(1)}%`,
                        angle: labelAngle,
                        color: segment.color
                    });
                }
                
                currentAngle += sliceAngle;
            }
            
            // Verify we drew a complete circle
            const finalAngle = currentAngle + Math.PI / 2; // Adjust back
            
            // Store segments data for hover interactions
            canvas.pieChartData = {
                segments: segments,
                total: total,
                centerX: centerX,
                centerY: centerY,
                radius: radius
            };
            
            // Second pass: draw labels with leader lines
            labels.forEach(label => {
                // Draw leader line
                ctx.beginPath();
                ctx.moveTo(label.lineStartX, label.lineStartY);
                ctx.lineTo(label.lineEndX, label.lineEndY);
                ctx.strokeStyle = '#666';
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Determine text alignment based on angle
                let textAlign = 'center';
                let xOffset = 0;
                if (Math.cos(label.angle) > 0.1) {
                    textAlign = 'left';
                    xOffset = 3;
                } else if (Math.cos(label.angle) < -0.1) {
                    textAlign = 'right';
                    xOffset = -3;
                }
                
                // Draw text
                ctx.font = '11px Arial';
                ctx.fillStyle = '#333';
                ctx.textAlign = textAlign;
                ctx.textBaseline = 'bottom';
                ctx.fillText(label.text, label.textX + xOffset, label.textY - 2);
                
                // Draw percentage
                ctx.font = 'bold 12px Arial';
                ctx.textBaseline = 'top';
                ctx.fillText(label.percent, label.textX + xOffset, label.textY + 2);
            });
            
            // Update legend using segments array
            const legendElement = document.getElementById(legendId);
            if (legendElement) {
                let legendHtml = '';
                
                // Show all segments in legend
                segments.forEach((segment, index) => {
                    const percent = ((segment.value / total) * 100).toFixed(1);
                    legendHtml += `
                        <div style="display: flex; align-items: center; min-width: 120px;">
                            <div style="width: 12px; height: 12px; background: ${segment.color}; margin-right: 6px; border-radius: 0; flex-shrink: 0;"></div>
                            <span style="flex: 1; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;" title="${segment.label}">${segment.label}</span>
                            <span style="font-weight: bold; font-size: 11px; margin-left: 4px;">${percent}%</span>
                        </div>
                    `;
                });
                
                legendElement.innerHTML = legendHtml;
            }
            
            // Add mouse hover handler
            canvas.onmousemove = function(e) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Convert to canvas coordinates (accounting for CSS scaling)
                const canvasX = (x * width) / rect.width;
                const canvasY = (y * height) / rect.height;
                
                // Check if mouse is over pie
                const dx = canvasX - centerX;
                const dy = canvasY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance <= radius) {
                    // Calculate angle
                    let angle = Math.atan2(dy, dx) + Math.PI / 2; // Adjust for starting position
                    if (angle < 0) angle += 2 * Math.PI;
                    
                    // Find which segment we're hovering over
                    let currentAngleCheck = 0;
                    for (let segment of segments) {
                        const sliceAngle = (segment.value / total) * 2 * Math.PI;
                        
                        if (angle >= currentAngleCheck && angle <= currentAngleCheck + sliceAngle) {
                            const chartType = canvas.pieData?.chartType || null;
                            showTooltip(e, segment, (segment.value / total) * 100, chartType);
                            canvas.style.cursor = 'pointer';
                            return;
                        }
                        currentAngleCheck += sliceAngle;
                    }
                }
                
                // Not hovering over any segment
                hideTooltip();
                canvas.style.cursor = 'default';
            };
            
            canvas.onmouseleave = function() {
                hideTooltip();
                canvas.style.cursor = 'default';
            };
        }
        
        // Function to update distribution charts
        function updateDistributionCharts() {
            // Get current chart mode (count or sum)
            const chartMode = document.querySelector('input[name="chartMode"]:checked')?.value || 'sum';
            
            const chartsSection = document.getElementById('chartsSection');
            if (!chartsSection) return;
            
            // Only show charts section if we have data
            if (!filteredSoftData && !filteredHardData && !softData && !hardData) {
                chartsSection.style.display = 'none';
                return;
            }
            
            // Show charts section
            chartsSection.style.display = 'block';
            
            // Update titles
            const protectionTitle = document.getElementById('protectionTitle');
            if (protectionTitle) protectionTitle.textContent = t('protectionStatus');
            
            // Get current data based on tab
            let dataToAnalyze = [];
            
            if (currentTab === 'soft') {
                // Use filtered data if available, otherwise use original data
                let dataSource = (filteredSoftData?.positions?.length > 0) ? filteredSoftData.positions : 
                                   (softData?.positions || []);
                
                // Apply date filter - position is active if it overlaps with the date range
                if (tableDateStart || tableDateEnd) {
                    dataSource = dataSource.filter(p => {
                        if (!p.first_dt) return false;
                        const openDate = new Date(p.first_dt);
                        const closeDate = p.last_dt ? new Date(p.last_dt) : new Date();
                        
                        // Position is active if:
                        // - opened before the end of the range AND
                        // - closed after the start of the range (or still open)
                        const rangeEnd = tableDateEnd || new Date();
                        const rangeStart = tableDateStart || new Date(0);
                        
                        return openDate <= rangeEnd && closeDate >= rangeStart;
                    });
                }
                
                dataToAnalyze = dataSource.map(p => ({
                    platform: p.platform,
                    network: p.chain,
                    token: p.collateral_token,
                    value: chartMode === 'count' ? 1 : parseFloat(p.tvl || p.collateral_usd || 0)
                }));
            } else if (currentTab === 'hard') {
                // Use filtered data if available, otherwise use original data
                let dataSource = (filteredHardData?.events?.length > 0) ? filteredHardData.events : 
                                   (hardData?.events || []);
                
                // Apply date filter
                if (tableDateStart || tableDateEnd) {
                    dataSource = dataSource.filter(e => {
                        if (!e.timestamp) return false;
                        const date = new Date(e.timestamp);
                        if (tableDateStart && date < tableDateStart) return false;
                        if (tableDateEnd && date > tableDateEnd) return false;
                        return true;
                    });
                }
                
                dataToAnalyze = dataSource.map(e => ({
                    platform: e.platform,
                    network: e.chain,
                    token: e.collateral_token,
                    value: chartMode === 'count' ? 1 : parseFloat(e.debt || 0)
                }));
            } else if (currentTab === 'comparison') {
                // For comparison tab, calculate the difference (protected funds = soft - hard)
                
                let softSource = (filteredSoftData?.positions?.length > 0) ? filteredSoftData.positions : 
                                   (softData?.positions || []);
                let hardSource = (filteredHardData?.events?.length > 0) ? filteredHardData.events : 
                                   (hardData?.events || []);
                
                // Apply date filter to soft data - position is active if it overlaps with the date range
                if (tableDateStart || tableDateEnd) {
                    softSource = softSource.filter(p => {
                        if (!p.first_dt) return false;
                        const openDate = new Date(p.first_dt);
                        const closeDate = p.last_dt ? new Date(p.last_dt) : new Date();
                        
                        // Position is active if it overlaps with the date range
                        const rangeEnd = tableDateEnd || new Date();
                        const rangeStart = tableDateStart || new Date(0);
                        
                        return openDate <= rangeEnd && closeDate >= rangeStart;
                    });
                    
                    hardSource = hardSource.filter(e => {
                        if (!e.timestamp) return false;
                        const date = new Date(e.timestamp);
                        if (tableDateStart && date < tableDateStart) return false;
                        if (tableDateEnd && date > tableDateEnd) return false;
                        return true;
                    });
                }
                
                // Aggregate soft liquidations
                const softAgg = {};
                softSource.forEach(p => {
                    const key = p.collateral_token || 'Unknown';
                    if (!softAgg[key]) {
                        softAgg[key] = { count: 0, tvl: 0, positions: [] };
                    }
                    softAgg[key].count += 1;
                    
                    // Check for data anomalies
                    const tvl = parseFloat(p.tvl || p.collateral_usd || 0);
                    
                    softAgg[key].tvl += tvl;
                    softAgg[key].positions.push({tvl, user: p.user, market: p.market_id});
                });
                
                // Aggregate hard liquidations
                const hardAgg = {};
                hardSource.forEach(e => {
                    const key = e.collateral_token || 'Unknown';
                    if (!hardAgg[key]) {
                        hardAgg[key] = { count: 0, debt: 0 };
                    }
                    hardAgg[key].count += 1;
                    
                    // Check for data anomalies
                    const debt = parseFloat(e.debt_with_discount || e.debt || 0);
                    hardAgg[key].debt += debt;
                });
                
                // Calculate differences for pie chart
                dataToAnalyze = [];
                const allTokens = new Set([...Object.keys(softAgg), ...Object.keys(hardAgg)]);
                
                allTokens.forEach(token => {
                    const soft = softAgg[token] || { count: 0, tvl: 0 };
                    const hard = hardAgg[token] || { count: 0, debt: 0 };
                    
                    // For comparison, we subtract hard from soft
                    let value;
                    if (chartMode === 'count') {
                        // For count mode, just use soft count (positions in protection)
                        // Don't subtract hard events as they are different units
                        value = soft.count;
                    } else {
                        // For sum mode, calculate protected value (TVL - losses)
                        value = Math.max(0, soft.tvl - hard.debt);
                    }
                    
                    if (value > 0) {
                        // Find the platform/network for this token from soft data
                        const samplePos = softSource.find(p => p.collateral_token === token);
                        
                        dataToAnalyze.push({
                            platform: samplePos?.platform || 'Unknown',
                            network: samplePos?.chain || 'Unknown',
                            token: token,
                            value: value
                        });
                    }
                });
            }
            
            // Aggregate by platform - store both count and dollar values
            const platformData = {};
            const networkData = {};
            const tokenData = {};
            
            // For all tabs including comparison, aggregate the dataToAnalyze normally
            {
                // First, get the original data to calculate both count and dollar values
                let originalDataForCounting = [];
                if (currentTab === 'soft') {
                    let dataSource = (filteredSoftData?.positions?.length > 0) ? filteredSoftData.positions : 
                                       (softData?.positions || []);
                    if (tableDateStart || tableDateEnd) {
                        dataSource = dataSource.filter(p => {
                            if (!p.first_dt) return false;
                            const openDate = new Date(p.first_dt);
                            const closeDate = p.last_dt ? new Date(p.last_dt) : new Date();
                            
                            // Position is active if it overlaps with the date range
                            const rangeEnd = tableDateEnd || new Date();
                            const rangeStart = tableDateStart || new Date(0);
                            
                            return openDate <= rangeEnd && closeDate >= rangeStart;
                        });
                    }
                    originalDataForCounting = dataSource;
                } else if (currentTab === 'hard') {
                    let dataSource = (filteredHardData?.events?.length > 0) ? filteredHardData.events : 
                                       (hardData?.events || []);
                    if (tableDateStart || tableDateEnd) {
                        dataSource = dataSource.filter(e => {
                            if (!e.timestamp) return false;
                            const date = new Date(e.timestamp);
                            if (tableDateStart && date < tableDateStart) return false;
                            if (tableDateEnd && date > tableDateEnd) return false;
                            return true;
                        });
                    }
                    originalDataForCounting = dataSource;
                } else if (currentTab === 'comparison') {
                    // For comparison tab, we need both soft and hard data to calculate protected amount
                    let softSource = (filteredSoftData?.positions?.length > 0) ? filteredSoftData.positions : 
                                       (softData?.positions || []);
                    let hardSource = (filteredHardData?.events?.length > 0) ? filteredHardData.events : 
                                       (hardData?.events || []);
                    
                    if (tableDateStart || tableDateEnd) {
                        softSource = softSource.filter(p => {
                            if (!p.first_dt) return false;
                            const openDate = new Date(p.first_dt);
                            const closeDate = p.last_dt ? new Date(p.last_dt) : new Date();
                            
                            // Position is active if it overlaps with the date range
                            const rangeEnd = tableDateEnd || new Date();
                            const rangeStart = tableDateStart || new Date(0);
                            
                            return openDate <= rangeEnd && closeDate >= rangeStart;
                        });
                        
                        hardSource = hardSource.filter(e => {
                            if (!e.timestamp) return false;
                            const date = new Date(e.timestamp);
                            if (tableDateStart && date < tableDateStart) return false;
                            if (tableDateEnd && date > tableDateEnd) return false;
                            return true;
                        });
                    }
                    
                    // Create a map of soft positions for quick lookup
                    const softPositionsMap = new Map();
                    softSource.forEach(pos => {
                        if (pos.user && pos.market_id) {
                            const key = `${pos.user}_${pos.market_id}`;
                            if (!softPositionsMap.has(key)) {
                                softPositionsMap.set(key, []);
                            }
                            softPositionsMap.get(key).push({
                                first_dt: pos.first_dt ? new Date(pos.first_dt) : null,
                                last_dt: pos.last_dt ? new Date(pos.last_dt) : new Date('2100-01-01'), // Far future for active positions
                                platform: pos.platform,
                                network: pos.chain,
                                token: pos.collateral_token
                            });
                        }
                    });
                    
                    
                    // Process hard liquidations and identify which ones are duplicates
                    const hardDebts = {
                        byPlatform: {},
                        byNetwork: {},
                        byToken: {}
                    };
                    const hardCounts = {
                        byPlatform: {},
                        byNetwork: {},
                        byToken: {}
                    };
                    
                    let duplicateCount = 0;
                    let uniqueCount = 0;
                    
                    hardSource.forEach(event => {
                        const debt = parseFloat(event.debt_with_discount || event.debt || 0);
                        
                        // Check if this hard liquidation corresponds to a soft position
                        let isDuplicate = false;
                        if (event.user && event.market_id && event.timestamp) {
                            const key = `${event.user}_${event.market_id}`;
                            const eventTime = new Date(event.timestamp);
                            const positions = softPositionsMap.get(key);
                            
                            if (positions) {
                                // Check if any position's lifetime contains this hard liquidation
                                isDuplicate = positions.some(pos => {
                                    return pos.first_dt && eventTime >= pos.first_dt && eventTime <= pos.last_dt;
                                });
                                
                                if (isDuplicate) {
                                    duplicateCount++;
                                } else {
                                    uniqueCount++;
                                }
                            } else {
                                uniqueCount++;
                            }
                        } else {
                            uniqueCount++;
                        }
                        
                        // Always add debt (financial loss)
                        if (event.platform) {
                            hardDebts.byPlatform[event.platform] = (hardDebts.byPlatform[event.platform] || 0) + debt;
                            // Only count if not a duplicate
                            if (!isDuplicate) {
                                hardCounts.byPlatform[event.platform] = (hardCounts.byPlatform[event.platform] || 0) + 1;
                            }
                        }
                        if (event.chain) {
                            hardDebts.byNetwork[event.chain] = (hardDebts.byNetwork[event.chain] || 0) + debt;
                            // Only count if not a duplicate
                            if (!isDuplicate) {
                                hardCounts.byNetwork[event.chain] = (hardCounts.byNetwork[event.chain] || 0) + 1;
                            }
                        }
                        if (event.collateral_token) {
                            hardDebts.byToken[event.collateral_token] = (hardDebts.byToken[event.collateral_token] || 0) + debt;
                            // Only count if not a duplicate
                            if (!isDuplicate) {
                                hardCounts.byToken[event.collateral_token] = (hardCounts.byToken[event.collateral_token] || 0) + 1;
                            }
                        }
                    });
                    
                    
                    // Now process soft liquidations and calculate protected amounts
                    softSource.forEach(item => {
                        const platform = item.platform;
                        const network = item.chain;
                        const token = item.collateral_token;
                        const softTVL = parseFloat(item.tvl || item.collateral_usd || 0);
                        
                        // For dollars, calculate protected amount (soft TVL - hard debt)
                        // For count, just use the soft position count
                        if (platform) {
                            if (!platformData[platform]) {
                                platformData[platform] = { count: 0, dollars: 0 };
                            }
                            platformData[platform].count += 1;
                            // Protected amount for this platform
                            const hardDebt = hardDebts.byPlatform[platform] || 0;
                            // Add soft TVL to platform total
                            platformData[platform].dollars += softTVL;
                        }
                        if (network) {
                            if (!networkData[network]) {
                                networkData[network] = { count: 0, dollars: 0 };
                            }
                            networkData[network].count += 1;
                            // Add soft TVL to network total
                            networkData[network].dollars += softTVL;
                        }
                        if (token) {
                            if (!tokenData[token]) {
                                tokenData[token] = { count: 0, dollars: 0 };
                            }
                            tokenData[token].count += 1;
                            // Add soft TVL to token total
                            tokenData[token].dollars += softTVL;
                        }
                    });
                    
                    // Now subtract hard debts AND counts from the totals to get protected amounts
                    Object.keys(hardDebts.byPlatform).forEach(platform => {
                        if (platformData[platform]) {
                            platformData[platform].dollars = Math.max(0, platformData[platform].dollars - hardDebts.byPlatform[platform]);
                            platformData[platform].count = Math.max(0, platformData[platform].count - (hardCounts.byPlatform[platform] || 0));
                        }
                    });
                    Object.keys(hardDebts.byNetwork).forEach(network => {
                        if (networkData[network]) {
                            networkData[network].dollars = Math.max(0, networkData[network].dollars - hardDebts.byNetwork[network]);
                            networkData[network].count = Math.max(0, networkData[network].count - (hardCounts.byNetwork[network] || 0));
                        }
                    });
                    Object.keys(hardDebts.byToken).forEach(token => {
                        if (tokenData[token]) {
                            tokenData[token].dollars = Math.max(0, tokenData[token].dollars - hardDebts.byToken[token]);
                            tokenData[token].count = Math.max(0, tokenData[token].count - (hardCounts.byToken[token] || 0));
                        }
                    });
                    
                    // Skip the regular aggregation for comparison mode
                    originalDataForCounting = [];
                }
                
                // Aggregate both count and dollar values (skip for comparison mode as we already did it)
                if (currentTab !== 'comparison') {
                    originalDataForCounting.forEach(item => {
                        const platform = item.platform;
                        const network = item.chain;
                        const token = item.collateral_token;
                        const dollarValue = currentTab === 'soft' ? 
                            parseFloat(item.tvl || item.collateral_usd || 0) :
                            parseFloat(item.debt || 0);
                    
                        if (platform) {
                            if (!platformData[platform]) {
                                platformData[platform] = { count: 0, dollars: 0 };
                            }
                            platformData[platform].count += 1;
                            platformData[platform].dollars += dollarValue;
                        }
                        if (network) {
                            if (!networkData[network]) {
                                networkData[network] = { count: 0, dollars: 0 };
                            }
                            networkData[network].count += 1;
                            networkData[network].dollars += dollarValue;
                        }
                        if (token) {
                            if (!tokenData[token]) {
                                tokenData[token] = { count: 0, dollars: 0 };
                            }
                            tokenData[token].count += 1;
                            tokenData[token].dollars += dollarValue;
                        }
                    });
                }
            }
            
            // Convert to array format and sort based on current chart mode
            const platformArray = Object.entries(platformData)
                .map(([label, data]) => ({
                    label, 
                    value: chartMode === 'count' ? data.count : data.dollars,
                    count: data.count,
                    dollars: data.dollars
                }))
                .sort((a, b) => b.value - a.value);
            
            const networkArray = Object.entries(networkData)
                .map(([label, data]) => ({
                    label, 
                    value: chartMode === 'count' ? data.count : data.dollars,
                    count: data.count,
                    dollars: data.dollars
                }))
                .sort((a, b) => b.value - a.value);
            
            const tokenArray = Object.entries(tokenData)
                .map(([label, data]) => ({
                    label, 
                    value: chartMode === 'count' ? data.count : data.dollars,
                    count: data.count,
                    dollars: data.dollars
                }))
                .sort((a, b) => b.value - a.value);
            
            // Store data globally for chart switching
            window.chartData = {
                platform: platformArray,
                network: networkArray,
                token: tokenArray
            };
            
            // Get current distribution type selection
            const currentDistributionType = document.querySelector('input[name="distributionType"]:checked')?.value || 'token';
            
            // Draw chart with current selection (not always defaulting to 'token')
            setTimeout(() => {
                switchDistributionChart(currentDistributionType);
                
                // Update protection chart
                updateProtectionChart();
            }, 100);
        }
        
        // Methodology popup functions
        function showMethodologyPopup() {
            // Always recreate modal to ensure correct language
            const existingModal = document.getElementById('methodologyModal');
            if (existingModal) {
                existingModal.remove();
            }
            createMethodologyModal();
            const modal = document.getElementById('methodologyModal');
            if (modal) {
                setTimeout(() => modal.classList.add('show'), 10);
            }
        }
        
        function closeMethodologyPopup() {
            const modal = document.getElementById('methodologyModal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        }
        
        function createMethodologyModal() {
            const modalHTML = `
                <div id="methodologyModal" class="methodology-modal">
                    <div class="methodology-content">
                        <div class="methodology-header">
                            <h2 class="methodology-title">
                                ${currentLang === 'en' ? 'How are Protected Funds Calculated?' : 'Как рассчитываются защищенные средства?'}
                            </h2>
                            <button onclick="closeMethodologyPopup()" class="methodology-close">×</button>
                        </div>
                        
                        <div class="methodology-body">
                            ${currentLang === 'en' ? `
                                <h3>What does it mean?</h3>
                                <p>Curve Finance has a unique liquidation protection system. Instead of instant collateral loss, the system gradually converts it, allowing position recovery.</p>
                                <p><strong>Protected Funds</strong> = user funds that the system saved from loss.</p>
                                
                                <h3>How are funds in liquidation protection mode (soft liquidation) calculated?</h3>
                                <p>For each position active in liquidation protection mode in the selected time period:</p>
                                <ol>
                                    <li>Take the amount of collateral tokens in the position</li>
                                    <li>Multiply by the maximum oracle price during the position's time in liquidation protection mode</li>
                                    <li>Sum the values of all active positions for the selected time period</li>
                                </ol>
                                <p class="methodology-note">
                                    Using the maximum price shows the maximum value the position had and how much the user could have lost in a hard liquidation.
                                </p>
                                
                                <h3>How are losses from hard liquidations calculated?</h3>
                                <p>For each hard liquidation in the selected period:</p>
                                <ol>
                                    <li>Take the debt amount that was liquidated plus the liquidator's discount</li>
                                    <li>Sum all such losses for the selected time period</li>
                                </ol>
                                <p>These are user losses from positions that couldn't be recovered.</p>
                                
                                <h3>Formula</h3>
                                <div class="methodology-formula">
                                    Protected Funds = Total Value in Liquidation Protection Mode - Losses from Hard Liquidations
                                </div>
                                
                                <h3>Example</h3>
                                <div class="methodology-example">
                                    <p>For August 2025 (range: 01.08.2025 - 31.08.2025):</p>
                                    <p>In liquidation protection mode (soft liquidation): <strong>$7.11M</strong></p>
                                    <p>Losses over selected period: <strong>$676.57K</strong></p>
                                    <p class="methodology-result"><strong>Protected: $6.43M (90.5%)</strong></p>
                                    <p class="methodology-note-small">This means 90.5% of funds were protected from loss thanks to the LLAMMA system.</p>
                                </div>
                            ` : `
                                <h3>Что это значит?</h3>
                                <p>В Curve Finance есть уникальная система защиты от ликвидаций. Вместо мгновенной потери залога, система постепенно конвертирует его, давая возможность восстановления позиции.</p>
                                <p><strong>Защищенные средства</strong> = средства пользователей, которые система уберегла от потери.</p>
                                
                                <h3>Как считаются средства в режиме защиты от ликвидации (в мягкой ликвидации)?</h3>
                                <p>Для каждой позиции находящейся в режиме защиты от ликвидации за выбранный промежуток времени:</p>
                                <ol>
                                    <li>Берется количество залоговых токенов в позиции</li>
                                    <li>Умножается на максимальную цену oracle за время нахождения позиции в режиме защиты от ликвидации</li>
                                    <li>Суммируются стоимости всех активных позиций за выбранный промежуток времени</li>
                                </ol>
                                <p class="methodology-note">
                                    Использование максимальной цены показывает, какую максимальную стоимость имела позиция и сколько пользователь мог бы потерять при жесткой ликвидации.
                                </p>
                                
                                <h3>Как считаются потери от жестких ликвидаций?</h3>
                                <p>Для каждой жесткой ликвидации в выбранном периоде:</p>
                                <ol>
                                    <li>Берется сумма долга, который был ликвидирован, плюс дисконт ликвидатору</li>
                                    <li>Суммируются все такие потери за выбранный промежуток времени</li>
                                </ol>
                                <p>Это потери пользователей, которые не смогли восстановить свои позиции.</p>
                                
                                <h3>Формула</h3>
                                <div class="methodology-formula">
                                    Защищенные средства = Общая стоимость в режиме защиты от ликвидации - Потери от жестких ликвидаций
                                </div>
                                
                                <h3>Пример</h3>
                                <div class="methodology-example">
                                    <p>За Август 2025 (диапазон: 01.08.2025 - 31.08.2025):</p>
                                    <p>В режиме защиты от ликвидации (мягкой ликвидации) находится: <strong>$7.11M</strong></p>
                                    <p>Потери за выбранный период: <strong>$676.57K</strong></p>
                                    <p class="methodology-result"><strong>Защищено: $6.43M (90.5%)</strong></p>
                                    <p class="methodology-note-small">Это означает, что 90.5% средств были защищены от потери благодаря системе LLAMMA.</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to body
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Close on background click
            document.getElementById('methodologyModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeMethodologyPopup();
                }
            });
        }

// Define loadData function
async function loadData() {
    try {
        await loadScriptByName('latest_liquidations.js');
        if (window.SOFT_LIQUIDATIONS_DATA) {
            processLoadedData(window.SOFT_LIQUIDATIONS_DATA);
            const fileNameElement = document.getElementById('fileName');
            if (fileNameElement) {
                fileNameElement.textContent = currentLang === 'en' ? 'latest_liquidations.js loaded' : 'latest_liquidations.js загружен';
            }
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}
window.loadData = loadData;

// Initialize on page load
window.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    initializeSliders();
    setLanguage(currentLang);
});
