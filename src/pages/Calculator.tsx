
import { useState, useEffect } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { SIPCalculator } from "@/components/calculator/SIPCalculator";
import { LumpsumCalculator } from "@/components/calculator/LumpsumCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Calculator = () => {
  useEffect(() => {
    document.title = "Investment Calculator | Keberiti";
  }, []);

  return (
    <PageLayout 
      title="Investment Calculator" 
      subtitle="Plan your investments and see how your money can grow over time"
    >
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="sip" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
            <TabsTrigger value="lumpsum">Lumpsum Calculator</TabsTrigger>
          </TabsList>
          <TabsContent value="sip">
            <SIPCalculator />
          </TabsContent>
          <TabsContent value="lumpsum">
            <LumpsumCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Calculator;
