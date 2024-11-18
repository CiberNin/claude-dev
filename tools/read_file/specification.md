# Read File Tool Enhancement Specification

## Current Implementation

The read_file tool currently:
- Takes a single file path
- Returns raw file content as string
- Used in:
  - src/core/Cline.ts: read_file tool implementation
  - src/core/mentions/index.ts: file content mention parsing
  - src/integrations/misc/extract-text.ts: core file reading logic

## Proposed Changes

### 1. New Output Format
```xml
<ReadResults bytes='total_bytes' lines='total_lines'>
  <Content 
    path='relative/path/to/file' 
    bytes='file_bytes' 
    lines='file_lines' 
    modified='timestamp'>
    actual file content here
  </Content>
</ReadResults>

<!-- For errors -->
<!-- If file is to long, then we may still provide bytes/lines statistics-->
<!-- If file is not readable as text, we may provide just bytes-->
<ReadResults>
  <Content 
    path='failed/file/path' 
    error='error message'/>
</ReadResults>
```

### 2. File Types & Interfaces

```typescript
// In src/integrations/misc/extract-text.ts
interface FileReadResult {
    path: string
    content?: string
    error?: string
    bytes: number
    lines: number
    modified: number // timestamp
}
// Why did you want to remove this?
interface MultiFileReadResult {
    totalBytes: number
    totalLines: number
    files: FileReadResult[]
}
```

### 3. Required Changes

#### Phase 1: Core Reading Logic
1. Update extract-text.ts:
   - Modify FileReadResult interface to include metadata
   - Update extractTextFromFile() to return FileReadResult
   - Keep original function signature for backward compatibility
   - Add new getFileMetadata() helper function

#### Phase 2: Response Formatting
1. Add new formatter in responses.ts:
   - Add formatReadResults() function
   - Format metadata and content in XML structure
   - Handle both success and error cases

#### Phase 3: Tool Implementation
1. Update Cline.ts read_file tool:
   - Use new FileReadResult interface
   - Implement new XML output format
   - Update error handling

#### Phase 4: Mention Parser Updates
1. Update mentions/index.ts:
   - Keep using extractTextFromFile() directly
   - No changes needed as it uses raw content

### 4. Backward Compatibility

- extractTextFromFile() maintains same function signature
- New metadata added through return type enhancement
- Existing file content mention parsing unaffected

### 5. Implementation Steps

1. [X] Create feature branch 'multi-path-read-tool'
2. [ ] Update extract-text.ts with new interface
3. [ ] Add formatReadResults to responses.ts
4. [ ] Update read_file tool in Cline.ts
5. [ ] Update documentation
6. [ ] Review and merge

### 6. Dependencies

- extract-text.ts changes affect:
  - src/core/Cline.ts
  - src/core/mentions/index.ts
  - src/core/prompts/responses.ts (new dependency)

### 7. Risks

- Breaking changes to FileReadResult interface
- Potential performance impact from metadata collection
- Error handling complexity with XML format
