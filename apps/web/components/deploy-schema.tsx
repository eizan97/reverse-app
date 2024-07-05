import Link from "next/link";
import { HelpCircle, CircleAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DeploySchema() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Connect project</CardTitle>
        <CardDescription>Deplou your migration script to your supabase project.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-1.5">
                <Label>Database Connection URL</Label>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="size-4 text-foreground/80" />
                    </TooltipTrigger>
                    <TooltipContent className="font-semibold">
                      <>
                        The connection string to your supabase database you can find this in your{" "}
                        <Link href="https://supabase.com/dashboard/project/_/settings/database" target="_blank" rel="noopener noreferrer" className="underline font-medium text-zinc-800">
                          database settings
                        </Link>{" "}
                        in the supavase dashboard.
                      </>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input className="w-full" placeholder="postgres://postgres.[referenceId]:[YOUR-PASSWORD]@[cloud]-0-[region].pooler.supabase.com:5432/postgres" />
            </div>
            <Alert variant="destructive" className="bg-destructive/20">
              <CircleAlert className="size-5 text-red-500/90" />
              <AlertTitle className="font-medium text-base text-red-500/90">We never store your database credintials</AlertTitle>
              <AlertDescription className="font-medium text-base text-red-500/90">
                The credentials you provide are used exclusively for validating your database connection and performing the migration script. We do not store your database credentials. You can examine the {""}
                <Link href="https://github.com/xavimon/supamigration" target="_blank" rel="noopener noreferrer" className="font-medium underline">source code</Link>{" "}
                for verifivcation.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Deploy</Button>
      </CardFooter>
    </Card>
  );
}
