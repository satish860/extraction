# Product Requirements Document: Field Management Enhancement

## 1. Executive Summary

This PRD outlines enhancements to the existing table interface to add a comprehensive Field Management System. The primary goal is to implement the field type selection and configuration features demonstrated in the UI mockups, transforming the current basic column addition into a rich, user-friendly field management experience.

## 2. Current State Analysis

### What We Have:
- Basic table with drag & drop file upload
- Simple column addition via popover with text input
- Row selection functionality
- Dynamic column rendering
- File upload integration

### What's Missing (Primary Focus):
- **Field Type Selection System** - The core dropdown with multiple field types
- **Property Configuration Panel** - Advanced column management options
- **Progressive Disclosure UI** - Guided field creation flow
- **Enhanced Visual Feedback** - Tooltips, icons, and descriptions

## 3. Core Feature Requirements

### 3.1 Field Type Selection Dropdown

**Primary User Flow:**
1. User clicks the "+" button to add a new column
2. Instead of immediate name input, show field type selection dropdown
3. Display comprehensive list of field types with visual indicators

**Field Types to Implement:**
- **Text** - Generate freeform text, perfect for tasks like summarization and open ended analysis
- **File** - Upload and manage large files, from PDFs to CSVs. Use files as inputs for AI models
- **Number** *(NEW)* - Numeric data input and calculations
- **Collection** - Grouped data management
- **Single Select** - Dropdown selection (single choice)
- **Multi Select** - Multiple choice selection
- **URL** - Link management and validation
- **Reference** - Cross-references to other entities
- **JSON** - Structured data format
- **Page Splitter** - Document section management

**Visual Requirements:**
- Each field type should have:
  - Icon representation
  - Clear title
  - Descriptive subtitle explaining use case
  - Hover states for better UX
  - "New" badge for recently added types (Number field)

### 3.2 Enhanced Column Configuration

**Property Panel Features:**
After field type selection, users should be able to configure:

1. **Basic Settings:**
   - Column name (with auto-suggestions)
   - Field type (changeable)
   - User input toggle

2. **Display Options:**
   - Sort ascending
   - Sort descending
   - Pin column
   - Hide from view

3. **Advanced Settings:**
   - More settings (expandable)
   - AI citations toggle
   - Delete property (with confirmation)

**Auto-naming Logic:**
- Start with "New property"
- Allow progressive refinement: "New property" → "CIM" → "CIM Doc" → "CIM Document"
- Save naming state during typing
- Suggest names based on field type

### 3.3 User Experience Flow

**Step-by-Step Enhancement:**
1. **Empty State**: Clean table with clear "+" button
2. **Field Type Selection**: Dropdown with visual field type cards
3. **Configuration**: Property panel with all options
4. **Naming**: Inline editing with auto-suggestions
5. **Completion**: Column added with proper configuration

## 4. Technical Implementation Requirements

### 4.1 Component Architecture

**New Components Needed:**
```
components/
├── field-management/
│   ├── field-type-selector.tsx
│   ├── field-type-card.tsx
│   ├── property-configuration-panel.tsx
│   ├── column-context-menu.tsx
│   └── field-icons.tsx
```

### 4.2 Data Structure Updates

**Enhanced Column Schema:**
```typescript
type FieldType = 'text' | 'file' | 'number' | 'collection' | 'single-select' | 
                 'multi-select' | 'url' | 'reference' | 'json' | 'page-splitter'

type DynamicColumn = {
  id: string
  name: string
  type: FieldType
  description?: string
  settings: {
    userInput: boolean
    aiCitations: boolean
    sortOrder?: 'asc' | 'desc'
    isPinned: boolean
    isHidden: boolean
  }
  validation?: FieldValidation
}
```

### 4.3 State Management

**Enhanced State Requirements:**
- Field type selection state
- Property configuration state
- Column reordering capability
- Naming suggestion logic
- Undo/redo for column operations

## 5. User Interface Specifications

### 5.1 Field Type Selector Design

**Visual Specifications:**
- Clean dropdown with search capability
- Field type cards with:
  - 24x24px icons
  - Bold field type names
  - Light gray description text
  - Subtle hover effects
  - Proper spacing and padding

### 5.2 Property Configuration Panel

**Layout Requirements:**
- Collapsible sections
- Toggle switches for boolean options
- Dropdown menus for selections
- Contextual help text
- Action buttons (Save, Cancel, Delete)

### 5.3 Interactive States

**Hover States:**
- Field type cards: Subtle background color change
- Icons: Slight scale/color enhancement
- Buttons: Standard hover feedback

**Selection States:**
- Active field type: Highlighted border/background
- Selected columns: Visual indication
- Drag states: Clear drop zones

## 6. Success Metrics

### 6.1 User Experience Metrics
- Time to create new column: < 10 seconds
- Error rate in field configuration: < 5%
- User satisfaction with field type selection: 4.5/5

### 6.2 Technical Performance
- Dropdown render time: < 100ms
- Table re-render efficiency: No unnecessary renders
- Memory usage: Minimal impact on existing performance

## 7. Implementation Phases

### Phase 1: Core Field Type Selector (Week 1)
- Build field type dropdown component
- Implement basic field type cards
- Replace existing column addition flow

### Phase 2: Property Configuration (Week 2)
- Add property configuration panel
- Implement advanced column settings
- Add auto-naming functionality

### Phase 3: Enhanced UX (Week 3)
- Add animations and transitions
- Implement tooltip system
- Polish visual design and interactions

### Phase 4: Testing & Refinement (Week 4)
- User testing and feedback integration
- Performance optimization
- Documentation and cleanup

## 8. Future Considerations

### 8.1 Advanced Features
- Field type templates/presets
- Bulk column operations
- Column relationship mapping
- Import/export column configurations

### 8.2 Integration Points
- AI model integration for field suggestions
- Database schema synchronization
- API endpoint generation from field definitions

## 9. Risk Assessment

### 9.1 Technical Risks
- **Risk**: Complex dropdown state management
- **Mitigation**: Use proven state management patterns, comprehensive testing

### 9.2 UX Risks
- **Risk**: Overwhelming number of field types
- **Mitigation**: Progressive disclosure, search/filtering, clear categorization

### 9.3 Performance Risks
- **Risk**: Table re-render performance with many columns
- **Mitigation**: React.memo, virtualization if needed

## 10. Acceptance Criteria

### 10.1 Core Functionality
- [ ] Field type dropdown displays all 10+ field types
- [ ] Each field type shows appropriate icon and description
- [ ] Property configuration panel allows all settings modifications
- [ ] Column naming supports auto-suggestions and inline editing
- [ ] All existing table functionality remains intact

### 10.2 User Experience
- [ ] Smooth transitions between selection states
- [ ] Clear visual feedback for all interactions
- [ ] Responsive design works on various screen sizes
- [ ] Keyboard navigation support for accessibility

### 10.3 Technical Requirements
- [ ] Type-safe implementation with TypeScript
- [ ] Clean component architecture with proper separation
- [ ] Consistent with existing codebase patterns
- [ ] Comprehensive error handling and validation

---

*This PRD focuses on enhancing the existing table interface to match the sophisticated field management capabilities shown in the UI mockups, prioritizing the dropdown selection system and property configuration features that are currently missing.*