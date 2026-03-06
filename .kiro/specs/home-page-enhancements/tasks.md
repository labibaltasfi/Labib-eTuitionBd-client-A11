# Implementation Plan: Home Page Enhancements

## Overview

This implementation adds four key enhancements to the Home page: a prominent HeroSection with call-to-action buttons, a LatestTuitionPosts section displaying the 6 most recent tuition opportunities, a LatestTutors section showcasing the 6 newest tutors, and Framer Motion animations throughout. The implementation leverages existing React + Vite architecture, TanStack Query for data fetching, and the useAxios hook for API calls.

## Tasks

- [x] 1. Install dependencies and set up project structure
  - Install framer-motion package: `npm install framer-motion`
  - Verify existing dependencies (TanStack Query, axios, react-router)
  - Create component directory structure if needed
  - _Requirements: 12.2_

- [ ] 2. Create HeroSection component with animations
  - [ ] 2.1 Implement HeroSection component with TypeScript
    - Create HeroSection.tsx in appropriate components directory
    - Add hero heading "Find Your Perfect Tutor" and descriptive subheading
    - Implement "Browse Tuitions" and "Become a Tutor" buttons
    - Add navigation handlers using useNavigate hook
    - Apply Framer Motion fade-in and slide-up animations
    - Style with Tailwind CSS and DaisyUI classes
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 7.1, 7.5_
  
  - [ ]* 2.2 Write property test for HeroSection navigation
    - **Property 6: Navigation Correctness**
    - **Validates: Requirements 1.5, 1.6**

- [ ] 3. Create utility functions for data processing
  - [ ] 3.1 Implement sortByCreatedDate utility function
    - Create utility function to sort items by createdAt field
    - Support both ascending and descending order
    - Handle missing createdAt fields (treat as epoch 0)
    - Ensure function does not mutate original array
    - Add TypeScript types for generic array sorting
    - _Requirements: 2.2, 4.2, 6.1, 6.2, 6.5_
  
  - [ ]* 3.2 Write property test for sortByCreatedDate
    - **Property 1: Descending Date Sort Order**
    - **Property 7: Data Immutability**
    - **Validates: Requirements 2.2, 4.2, 6.1, 6.5_
  
  - [ ] 3.3 Implement limitResults utility function
    - Create utility function to limit array to specified number of items
    - Handle cases where array length is less than limit
    - Ensure function does not mutate original array
    - Add TypeScript types for generic array limiting
    - _Requirements: 2.3, 4.3, 6.3, 6.4, 6.5_
  
  - [ ]* 3.4 Write property test for limitResults
    - **Property 2: Result Limiting**
    - **Validates: Requirements 2.3, 4.3, 6.3, 6.4**

- [ ] 4. Create LatestTuitionPosts component with data fetching
  - [ ] 4.1 Implement LatestTuitionPosts component with TypeScript
    - Create LatestTuitionPosts.tsx component
    - Define TuitionPost interface with all required fields
    - Implement data fetching using useAxios and TanStack Query
    - Fetch from /tuitionlist endpoint
    - Sort tuition posts by createdAt in descending order
    - Limit results to 6 items (configurable via props)
    - Configure 5-minute cache stale time
    - Handle loading and error states
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 12.1_
  
  - [ ] 4.2 Implement LatestTuitionPosts display and animations
    - Render section heading "Latest Tuition Posts"
    - Create responsive grid layout (md:2 cols, lg:3 cols)
    - Display class name, subject name, and district for each post
    - Add click handler to navigate to tuition details page
    - Apply Framer Motion staggered animations (0.1s stagger, 0.2s delay)
    - Use fade-in and scale-up card animations with ease-out timing
    - Style cards with Tailwind CSS and DaisyUI
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 7.2, 7.4, 7.5, 7.6_
  
  - [ ]* 4.3 Write property test for tuition post display
    - **Property 3: Tuition Post Display Completeness**
    - **Validates: Requirements 3.3, 3.4, 3.5**
  
  - [ ]* 4.4 Write property test for tuition post validation
    - **Property 9: Tuition Post Validation**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4**

- [ ] 5. Checkpoint - Verify tuition posts component
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Create LatestTutors component with data fetching
  - [ ] 6.1 Implement LatestTutors component with TypeScript
    - Create LatestTutors.tsx component
    - Define Tutor interface with all required fields
    - Implement data fetching using useAxios and TanStack Query
    - Fetch from /users endpoint with role=tutor query parameter
    - Sort tutors by createdAt in descending order
    - Limit results to 6 items (configurable via props)
    - Configure 5-minute cache stale time
    - Handle loading and error states
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 8.1, 12.1_
  
  - [ ] 6.2 Implement LatestTutors display and animations
    - Render section heading "Latest Tutors"
    - Create responsive grid layout (md:2 cols, lg:3 cols)
    - Display tutor profile photo (rounded, lazy loaded)
    - Display tutor display name and email
    - Conditionally display mobile number if present
    - Apply Framer Motion staggered animations (0.1s stagger, 0.2s delay)
    - Use fade-in and slide-from-left card animations with ease-out timing
    - Style cards with Tailwind CSS and DaisyUI
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 7.3, 7.4, 7.5, 7.6, 12.3_
  
  - [ ]* 6.3 Write property test for tutor display
    - **Property 4: Tutor Display Completeness**
    - **Property 5: Conditional Mobile Display**
    - **Validates: Requirements 5.3, 5.4, 5.5, 5.6**
  
  - [ ]* 6.4 Write property test for role filtering
    - **Property 8: Role Filtering**
    - **Validates: Requirements 8.1, 8.2, 8.3**
  
  - [ ]* 6.5 Write property test for tutor validation
    - **Property 10: Tutor Validation**
    - **Validates: Requirements 11.5, 11.6, 11.7, 11.8**

- [ ] 7. Checkpoint - Verify tutors component
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Update Home page to integrate all components
  - [ ] 8.1 Modify Home.tsx to include new components
    - Import HeroSection, LatestTuitionPosts, and LatestTutors components
    - Add HeroSection at the top of the page
    - Position existing Banner component after HeroSection
    - Add LatestTuitionPosts component after Banner
    - Add LatestTutors component after LatestTuitionPosts
    - Keep existing ScrollButtons component at the bottom
    - Apply consistent spacing between sections (py-12 or similar)
    - Maintain existing xl:w-9/12 mx-auto container wrapper
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_
  
  - [ ]* 8.2 Write integration tests for Home page
    - Test that all sections render in correct order
    - Test that data fetching occurs for both tuitions and tutors
    - Test that animations trigger on page load
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 9. Add error handling and recovery mechanisms
  - [ ] 9.1 Implement error boundaries and fallback UI
    - Add error state handling in LatestTuitionPosts component
    - Add error state handling in LatestTutors component
    - Display user-friendly error messages when API calls fail
    - Implement fallback rendering when Framer Motion fails to load
    - Add console logging for debugging errors
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ]* 9.2 Write unit tests for error handling
    - Test API failure scenarios
    - Test retry logic
    - Test fallback UI rendering
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 10. Final checkpoint - End-to-end verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation uses TypeScript with React, TanStack Query, and Framer Motion
- All components follow existing project patterns (useAxios hook, react-router navigation)
- Framer Motion animations use hardware-accelerated transforms for performance
- Data caching is set to 5 minutes to reduce API calls
- Property tests validate universal correctness properties from the design document
