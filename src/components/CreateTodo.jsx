import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
  FormControl,
  Input,
  Textarea,
  Select,
  ModalContent,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useGlobalState } from "../context";
import { useParams } from "react-router-dom";

const CreateTodo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useGlobalState();

  const [data, setData] = useState({});
  const { projectId } = useParams();
  const toast = useToast();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Add a document to firestore

  const addTodo = async () => {
    try {
      if (data?.name && data?.priority && data?.description && data?.date) {
        const docRef = await addDoc(
          collection(db, "users", user?.email, "projects", projectId, "tasks"),
          {
            ...data,
            done: false,
            createdAt: serverTimestamp(),
          }
        );
        console.log("Document written with ID: ", docRef.id);
      } else {
        toast({
          title: "Error",
          description: "Please fill all the fields while creating a new task",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <Flex
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        onClick={onOpen}
        sx={{
          p: 3,
          bgColor: "#F8CA94",
          color: "#353535",
          borderRadius: "8px",
          cursor: "pointer",
          fontFamily: "josefin",
          fontWeight: "600",
          width: "95%",
          boxShadow: "lg",
        }}
      >
        <Text>New task</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody sx={{ px: 5, py: 10, fontFamily: "josefin" }}>
            <Box>
              <VStack spacing={5}>
                {/* Task name */}
                <FormControl isRequired>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Item name"
                    autoComplete="off"
                    variant="filled"
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Date and time */}

                <FormControl isRequired>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    name="date"
                    variant="filled"
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Priority */}

                <FormControl isRequired>
                  <Select
                    variant="filled"
                    placeholder="Priority"
                    onChange={handleChange}
                    name="priority"
                  >
                    <option value="high">High priority</option>
                    <option value="medium">Medium priority</option>
                    <option value="low">Low priority</option>
                  </Select>
                </FormControl>

                {/* Task description */}

                <FormControl isRequired>
                  <Textarea
                    name="description"
                    placeholder="Item description"
                    rows={6}
                    resize="none"
                    autoComplete="off"
                    variant="filled"
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Add button */}

                <Button
                  colorScheme="orange"
                  bg="orange.400"
                  color="white"
                  _hover={{
                    bg: "orange.500",
                  }}
                  width="full"
                  onClick={() => {
                    onClose();
                    console.log(data);
                    addTodo();
                  }}
                >
                  Add
                </Button>
              </VStack>
            </Box>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTodo;
