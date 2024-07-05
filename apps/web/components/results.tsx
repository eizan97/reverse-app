import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

import { CodeEditor } from "@/components/code-editor";
import { RunCommand } from "@/components/run-command";
import { DeploySchema } from "@/components/deploy-schema";

type ResultProps = {
  code: string;
};
export function Results({ code }: ResultProps) {
  return (
    <Tabs defaultValue="sqlschema" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sqlschema">SQL Schema</TabsTrigger>
        <TabsTrigger value="migration">Migaration</TabsTrigger>
      </TabsList>
      <TabsContent value="sqlschema">
        <CodeEditor code={code} />
      </TabsContent>
      <TabsContent value="migration">
        <div className="flex flex-col gap-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg"> Run Command</CardTitle>
              <CardDescription> Run this command locally to create a scripy of your database migration.</CardDescription>
            </CardHeader>
            <CardContent>
              <RunCommand commandCode={""} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
