# How are Protected Funds Calculated?

## What does it mean?

Curve Finance has a unique liquidation protection system. Instead of instant collateral loss, the system gradually converts it, allowing position recovery.

**Protected Funds** = user funds that the system saved from loss.

## How are funds in liquidation protection mode (soft liquidation) calculated?

For each position active in liquidation protection mode in the selected time period:
1. Take the amount of collateral tokens in the position
2. Multiply by the maximum oracle price during the position's time in liquidation protection mode
3. Sum the values of all active positions for the selected time period

Using the maximum price shows the maximum value the position had and how much the user could have lost in a hard liquidation.

## How are losses from hard liquidations calculated?

For each hard liquidation in the selected period:
1. Take the debt amount that was liquidated plus the liquidator's discount
2. Sum all such losses for the selected time period

These are user losses from positions that couldn't be recovered.

## Formula

```
Protected Funds = Total Value in Liquidation Protection Mode - Losses from Hard Liquidations
```

## Example

For August 2025 (range: 01.08.2025 - 31.08.2025):
- In liquidation protection mode (soft liquidation): $7.11M
- Losses over selected period: $676.57K
- **Protected: $7.11M (90.5%)**

This means 90.5% of funds were protected from loss thanks to the LLAMMA system.
