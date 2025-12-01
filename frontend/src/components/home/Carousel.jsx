import { Box, IconButton, Image, Text, Heading, Flex, useColorModeValue } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const bg = useColorModeValue('white', 'gray.800');
    const overlayBg = useColorModeValue('rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)');
    const navigate = useNavigate();

    const goToPrevious = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index, e) => {
        e.stopPropagation();
        setCurrentIndex(index);
    };

    const handleCarouselClick = () => {
        const currentSlide = images[currentIndex];
        if (currentSlide.link) {
            if (currentSlide.link.startsWith('http')) {
                // External link
                window.open(currentSlide.link, '_blank');
            } else {
                // Internal link
                navigate(currentSlide.link);
            }
        }
    };

    const currentSlide = images[currentIndex];
    const hasLink = !!currentSlide.link;

    return (
        <Box 
            position="relative" 
            width="100%" 
            height={{ base: "300px", md: "500px" }} 
            overflow="hidden" 
            bg={bg} 
            borderRadius="lg" 
            shadow="xl"
            cursor={hasLink ? "pointer" : "default"}
            onClick={handleCarouselClick}
            _hover={hasLink ? { transform: "scale(1.002)", transition: "transform 0.2s" } : {}}
        >
            {/* Image */}
            <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                width="100%"
                height="100%"
                objectFit="cover"
            />

            {/* Overlay with text */}
            <Flex
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bg={overlayBg}
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                color="white"
                textAlign="center"
                px={4}
            >
                <Heading size={{ base: "xl", md: "2xl" }} mb={4}>
                    {currentSlide.title}
                </Heading>
                <Text fontSize={{ base: "md", md: "xl" }} maxW="600px">
                    {currentSlide.description}
                </Text>
            </Flex>

            {/* Left Arrow */}
            <IconButton
                icon={<FaChevronLeft boxSize={8} />}
                position="absolute"
                left="20px"
                top="50%"
                transform="translateY(-50%)"
                onClick={goToPrevious}
                colorScheme="whiteAlpha"
                size="lg"
                borderRadius="full"
                aria-label="Previous slide"
                _hover={{ bg: 'whiteAlpha.300' }}
                zIndex={2}
            />

            {/* Right Arrow */}
            <IconButton
                icon={<FaChevronRight boxSize={8} />}
                position="absolute"
                right="20px"
                top="50%"
                transform="translateY(-50%)"
                onClick={goToNext}
                colorScheme="whiteAlpha"
                size="lg"
                borderRadius="full"
                aria-label="Next slide"
                _hover={{ bg: 'whiteAlpha.300' }}
                zIndex={2}
            />

            {/* Dots indicator */}
            <Flex
                position="absolute"
                bottom="20px"
                left="50%"
                transform="translateX(-50%)"
                gap={2}
                zIndex={2}
            >
                {images.map((_, index) => (
                    <Box
                        key={index}
                        width="10px"
                        height="10px"
                        borderRadius="full"
                        bg={currentIndex === index ? "white" : "whiteAlpha.500"}
                        cursor="pointer"
                        onClick={(e) => goToSlide(index, e)}
                        transition="all 0.3s"
                        _hover={{ bg: "white" }}
                    />
                ))}
            </Flex>
        </Box>
    );
};

export default Carousel;