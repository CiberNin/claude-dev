# Cline Enhancement Ideas

## Tool Improvements

### Read Multiple Files Tool Enhancement
- Allow reading multiple files at once using multiple path tags
- Current:
```xml
<read_file>
<path>src/main.js</path>
</read_file>
```
- Proposed:
```xml
<read_file>
<path>src/main.js</path>
<path>src/utils.js</path>
<path>src/config.js</path>
</read_file>
```
- Benefits:
  - Reduces number of tool calls needed
  - More efficient for comparing multiple files
  - Better for tasks requiring context from multiple files

### Write Line Tool
- New tool for targeted line updates in large files
```xml
<write_line>
<path>src/main.js</path>
<line>42</line>
<content>const newConfig = { debug: true };</content>
</write_line>
```
- Or for line ranges:
```xml
<write_line>
<path>src/main.js</path>
<start_line>42</start_line>
<end_line>44</end_line>
<content>const newConfig = {
  debug: true,
  verbose: false
};</content>
</write_line>
```
- Benefits:
  - More efficient than rewriting entire file
  - Reduces risk of unintended changes
  - Better for small edits in large files

### File Ranking Tool
- New tool to rank files/folders by relevance to current task
```xml
<rank_files>
<path rank="1">src/main.js</path>
<path rank="3">src/rain/pain.js</path>
<path rank="3">src/tech</path>
<path rank="7">src/tech/index.htmx</path>
</rank_files>
```
- Ranking scale meanings:
  - 10: Critical/Core - Direct focus of current task
  - 9: Essential - Required for task completion
  - 8: High - Very relevant to task
  - 7: Significant - Contains important related code/content
  - 6: Moderate - Somewhat relevant, may need consultation
  - 5: Average - General project files, indirect relevance
  - 4: Low - Minimal relevance but worth noting
  - 3: Minor - Very peripheral connection
  - 2: Minimal - Almost irrelevant but has some tiny connection
  - 1: Negligible - Technically connected but practically irrelevant
  - 0: (Unranked) - No relevance to current task
- Features:
  - Rank inheritance: Folders pass default rank to contents
  - Selective ranking: Not all items need explicit ranking
  - Override capability: Individual files can override folder rank

### Inspect Directory
- Returns the file tree under the directory augmented with some useful statistics.
- Path | Files | Size | Lines | Gitignore (Optional)
- Gitignore directories & directories with more than 10 children will say ... unless they are the direct target of the command.
- 
```xml
<inspect_directory path="src/"/>
```
Example output:
```
Path | Files | Size | Lines | Gitignore
src/ | 15 | 2.1MB | 4,200
├── core/ | 8 | 1.5MB | 3,000
│   ├── Cline.ts | 1 | 50KB | 800
│   └── prompts/ | 3 | 1.45MB | 2,200
│       ├── system.ts | 1 | 1.4MB | 2,000 
│       └── responses.ts | 1 | 50KB | 200 
├── node_modules/ | 5 | 334KB | 1700 | IGNORE
│   └── ...
├── test_sqlite.db | 1 | ... | ... | IGNORE
└── utils/ | 7 | 600KB | 1,200
    ├── fs.ts | 1 | 200KB | 300 
    └── path.ts | 1 | 150KB | 400 
```
```

## Implementation Notes

### Priority Order
1. Write Line Tool - Most immediately useful for current development
2. Read Multiple Files - Natural extension of existing functionality
3. Enhanced List Tool - Helpful for project navigation
4. File Ranking Tool - More complex, requires careful design

### Technical Considerations
- Need to handle large files efficiently
- Consider caching for frequently accessed files
- Ensure backward compatibility
- Add proper error handling for all new features
- Consider impact on memory usage

### System Prompt Updates Needed
- Add new tool definitions following existing XML format
- Update tool use examples to show new capabilities
- Add new tool descriptions with clear parameter explanations
- Document any new rules or guidelines for tool usage
