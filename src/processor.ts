import * as ss58 from "@subsquid/ss58";
import {
  EventHandlerContext,
  Store,
  SubstrateProcessor,
} from "@subsquid/substrate-processor";
import { Account } from "./model";
import { BalancesTransferEvent } from "./types/events";
import { getOrCreate } from "./utils/getOrCreate";
// TODO: include types.json from root to avoid duplicate
import oldTypesBundle from "./types.json";

// TODO: extract to .env
const treasuryAddress = "7L53bUTBopuwFt3mKUfmkzgGLayYa1Yvn1hAg9v5UMrQzTfh";
const galacticCouncilAddress =
  "7HqdGVRB4MXz1osLR77mfWoo536cWasTYsuAbVuicHdiKQXf";
const hydraPrefix = 63;

const processor = new SubstrateProcessor("treasury-spend");
processor.setTypesBundle(oldTypesBundle);
processor.setBatchSize(500);

processor.setDataSource({
  archive: "http://snakenet-indexer.hydration.cloud:4010/v1/graphql",
  chain: "wss://archive.snakenet.hydradx.io",
});

processor.addEventHandler("balances.Transfer", async (ctx) => {
  const transferEvent = getTransferEventParameters(ctx);

  const treasuryIsSender = transferEvent.from === treasuryAddress;
  const excludedRecipient = transferEvent.to !== galacticCouncilAddress;

  if (treasuryIsSender && excludedRecipient) {
    console.log("Treasury spent at block height:", ctx.block.height);

    const treasuryAccount = await getOrCreate(
      ctx.store,
      Account,
      transferEvent.from
    );
    treasuryAccount.totalSpent = treasuryAccount.totalSpent || 0n;
    treasuryAccount.totalSpent += transferEvent.amount;

    await ctx.store.save(treasuryAccount);
  }
});

processor.run();

interface TransferEvent {
  from: string;
  to: string;
  amount: bigint;
}

const getTransferEventParameters = (
  ctx: EventHandlerContext
): TransferEvent => {
  const event = new BalancesTransferEvent(ctx);

  return {
    from: ss58.codec(hydraPrefix).encode(event.asV13[0]),
    to: ss58.codec(hydraPrefix).encode(event.asV13[1]),
    amount: event.asV13[2],
  };
};
