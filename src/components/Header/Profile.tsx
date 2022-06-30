import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData?: boolean; 
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return(
        <Flex align="center">
            { showProfileData && (
            <Box mr="4" textAlign="right">
                <Text>Danilo Cucharro</Text>
                <Text color="gray.300" fontSize="small">
                    danicucharro@outlook.com
                </Text>
            </Box>
            )}

            <Avatar size="md" name="Danilo Cucharro" src="https://github.com/danilocucharro" />
        </Flex>
    );
}