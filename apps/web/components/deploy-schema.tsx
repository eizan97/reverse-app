import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSchemaStore } from "@/store";
import { useRef } from "react";
import { toast } from "sonner";
import { SchemaDeploy } from "@/services/deploy";
import { CircleAlert } from "lucide-react";

export function DeploySchema() {
  const schema = useSchemaStore((state) => state.schema);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const deploy = async () => {
    const urlConnection = inputRef.current?.value;
    if (!urlConnection) {
      toast.error("Databse connection string is missing.");
      return;
    }
    const isEmptyPassword = urlConnection.includes("[YOUR-PASSEORD]");
    if (schema.trim() === "" || isEmptyPassword) {
      toast.error("Please replace [YOUR-PASSEORD] with your actual database password.");
      return;
    }
    const result = await SchemaDeploy({
      sqlSchema: schema,
      url: urlConnection,
    });
    const { error, message } = result;
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(message);
    // console.log(schema, message);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Connect project</CardTitle>
        <CardDescription>Deplou your migration script to your supabase project.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label>Database Connection URL</Label>
                <Input className="w-full" ref={inputRef} placeholder="postgres://postgres.[referenceId]:[YOUR-PASSWORD]@[cloud]-0-[region].pooler.supabase.com:5432/postgres" />
              </div>
              <p className="text-[13px] text-foreground/75">
                You can find your supavase database connection URL in your{""}
                <Link href="https://supabase.com/dashboard/project/_/settings/database" target="_blank" rel="noopener noreferrer" className="underline font-medium text-primary">Databse settings</Link>{" "}
                in the Supabase dashboard.
              </p>
            </div>
            <Alert variant="destructive" className="bg-destructive/20">
              <CircleAlert className="size-5 text-red-500/90" />
              <AlertTitle className="font-medium text-base text-red-500/90">We never store your database credintials</AlertTitle>
              <AlertDescription className="font-medium text-base text-red-500/90">
                The credentials you provide are used exclusively for validating your database connection and performing the migration script. We do not store your database credentials. You can examine the {""}
                <Link href="https://github.com/xavimon/supamigration" target="_blank" rel="noopener noreferrer" className="font-medium underline">
                  source code
                </Link>{" "}
                for verifivcation.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={deploy}>
          Deploy
        </Button>
      </CardFooter>
    </Card>
  );
}
