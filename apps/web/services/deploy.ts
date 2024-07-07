type SchemaDeploy = {
  sqlSchema: string;
  url: string;
};

export const SchemaDeploy = async (schemaDeploy: SchemaDeploy): Promise<{ message?: string; error?: string }> => {
  try {
    const request = await fetch("api/deploy", {
      method: "POST",
      body: JSON.stringify(schemaDeploy),
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await request.json();
    return result;
  } catch (error) {
    return {
      error: "An error has occured while deploying.",
    };
  }
};
