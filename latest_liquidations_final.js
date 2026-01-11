// Final corrected liquidations file
// Date range: 2023-05-01 to 2026-01-12
// Generated at: 2026-01-11T16:53:11.162164
// 
// CORRECTIONS APPLIED:
// 1. Soft positions with hard liquidations use TVL at hard liquidation date
// 2. Soft positions without hard use MAX TVL
// 3. Hard without soft get synthetic instant soft positions

window.SOFT_LIQUIDATIONS_DATA = {
  "hard_liquidations": {
    "lending": {
      "count": 0,
      "debt": 0,
      "controllers": 0,
      "users": 0
    },
    "crvusd": {
      "count": 0,
      "debt": 0,
      "controllers": 0,
      "users": 0
    },
    "total": {
      "count": 0,
      "debt": 0,
      "debt_with_discount": 0,
      "liquidation_discount": 0
    },
    "events": []
  },
  "soft_liquidations": {
    "summary": {
      "total_positions": 0,
      "total_tvl": 0,
      "total_debt": 0,
      "llamalend_positions": 0,
      "llamalend_tvl": 0,
      "llamalend_debt": 0,
      "crvusd_positions": 0,
      "crvusd_tvl": 0,
      "crvusd_debt": 0,
      "synthetic_positions": 0,
      "corrected_positions": 0
    },
    "positions": [],
    "network_stats": {},
    "token_stats": {},
    "top_positions": []
  }
};
