import React from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./TabSelector";

interface UserStatsProps {
  userId: string;
}

const UserStats: React.FC<UserStatsProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useTabs([
    "matches",
    "team",
    "gamestats",
  ]);
  return (
    <div className="w-full">
      <div className="flex border-b border-gray-300">
        <TabSelector
          isActive={selectedTab === "matches"}
          onClick={() => setSelectedTab("matches")}
        >
          Matches
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "team"}
          onClick={() => setSelectedTab("team")}
        >
          Team Info
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "gamestats"}
          onClick={() => setSelectedTab("gamestats")}
        >
          Game Stats
        </TabSelector>
      </div>
      <div className="p-4">
        <TabPanel hidden={selectedTab !== "matches"}>Coming Soon</TabPanel>
        <TabPanel hidden={selectedTab !== "team"}>Coming Soon</TabPanel>
        <TabPanel hidden={selectedTab !== "gamestats"}>Coming Soon</TabPanel>
      </div>
    </div>
  );
};

export default UserStats;
