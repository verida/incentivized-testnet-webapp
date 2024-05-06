import { activity as claimBinanceOwner } from "./claim-binance-owner-zkpass";
import { activity as claimBybitOwner } from "./claim-bybit-owner-zkpass";
import { activity as claimGateOwner } from "./claim-gate-owner-zkpass";
import { activity as claimKucoinOwner } from "./claim-kucoin-owner-zkpass";
import { activity as claimMEXCOwner } from "./claim-mexc-owner-zkpass";

export const activities = [
  claimBinanceOwner,
  claimBybitOwner,
  claimKucoinOwner,
  claimMEXCOwner,
  claimGateOwner,
];
