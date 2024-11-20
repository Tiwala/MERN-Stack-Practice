import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";
import { useState } from "react";

const ProductCard = ({ product }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast()
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image,
    })

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct)
        if (success) {
            toast({
                title: "Product updated",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            onClose()
        } else {
            toast({
                title: "Product update failed",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if (success) {
            toast({
                title: "Product deleted",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Product deletion failed",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        onClose();
    }

  return (
    <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton 
                    icon={<EditIcon />} 
                    // runs the onOpen function found in useDisclosure
                    onClick={onOpen} 
                    colorScheme='blue' 
                />
                <IconButton 
                    icon={<DeleteIcon />} 
                    onClick={() => handleDeleteProduct(product._id)} 
                    colorScheme='red' 
                />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input 
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input 
                            placeholder='Product Price'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input 
                            placeholder='Product Image'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorscheme='blue' 
                        mr={3}
                        onClick={() => handleUpdateProduct(product._id, updatedProduct)} 
                    >
                        Update
                    </Button>
                    <Button variant='ghost' onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  );
};

export default ProductCard;