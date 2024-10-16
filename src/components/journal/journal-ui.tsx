'use client'

import { useJournalProgram, useJournalProgramAccount } from './journal-data-access'
import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { ExplorerLink } from "../cluster/cluster-ui"
import { ellipsify } from "../ui/ui-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function JournalCreate() {
  const { createEntry } = useJournalProgram()
  const { publicKey } = useWallet()
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const isFormValid = title.trim() !== "" && message.trim() !== ""

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      createEntry.mutateAsync({ title, message, owner: publicKey })
    }
  }

  if (!publicKey) {
    return <p className="text-center text-muted-foreground">Connect your wallet</p>
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Journal Entry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={createEntry.isPending || !isFormValid}
        >
          {createEntry.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Journal Entry"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

function JournalCard({ account }: { account: PublicKey }) {
  const { accountQuery, updateEntry, deleteEntry } = useJournalProgramAccount({
    account,
  })
  const { publicKey } = useWallet()
  const [message, setMessage] = useState("")
  const title = accountQuery.data?.title

  const isFormValid = message.trim() !== ""

  const handleSubmit = () => {
    if (publicKey && isFormValid && title) {
      updateEntry.mutateAsync({ title, message, owner: publicKey })
    }
  }

  if (!publicKey) {
    return <p className="text-center text-muted-foreground">Connect your wallet</p>
  }

  if (accountQuery.isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin mx-auto" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="text-2xl cursor-pointer"
          onClick={() => accountQuery.refetch()}
        >
          {accountQuery.data?.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{accountQuery.data?.message}</p>
        <Textarea
          placeholder="Update message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={updateEntry.isPending || !isFormValid}
        >
          {updateEntry.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Journal Entry"
          )}
        </Button>
        <div className="text-center space-y-2">
          <p>
            <ExplorerLink
              path={`account/${account}`}
              label={ellipsify(account.toString())}
            />
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (
                !window.confirm(
                  "Are you sure you want to close this account?"
                )
              ) {
                return
              }
              const title = accountQuery.data?.title
              if (title) {
                return deleteEntry.mutateAsync(title)
              }
            }}
            disabled={deleteEntry.isPending}
          >
            {deleteEntry.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Closing...
              </>
            ) : (
              "Close"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export function JournalList() {
  const { accounts, getProgramAccount } = useJournalProgram()

  if (getProgramAccount.isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin mx-auto" />
  }

  return (
    <div className="space-y-6">
      {accounts.isLoading ? (
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      ) : accounts.data?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {accounts.data?.map((account) => (
            <JournalCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No accounts</h2>
          <p className="text-muted-foreground">No accounts found. Create one above to get started.</p>
        </div>
      )}
    </div>
  )
}