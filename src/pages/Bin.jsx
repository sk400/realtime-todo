import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Project from "../features/projects/Project";
import { useGlobalState } from "../context";

const Bin = () => {
  const { projects } = useGlobalState();

  const filteredProjects = projects?.filter(
    (project) => project?.isDeleted === true
  );

  return (
    <>
      <Flex
        direction="column"
        align="center"
        width="95%"
        mx="auto"
        gap={5}
        my={10}
        // mb={20}
      >
        <SimpleGrid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          spacing={4}
          width="100%"
        >
          {filteredProjects?.map((project) => (
            <Project item={project} key={project?.id} />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Bin;
