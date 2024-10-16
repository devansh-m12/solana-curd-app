import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Journal } from '../target/types/journal';

describe('journal', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Journal as Program<Journal>;

  it('should run the program', async () => {
    // Add your test here.
    const tx = await program.methods.createJournalEntry().rpc();
    console.log('Your transaction signature', tx);
  });
});
