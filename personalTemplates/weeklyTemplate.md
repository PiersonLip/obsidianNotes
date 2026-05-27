# <% tp.file.title %>
---
← [[<% tp.date.now("YYYY/[W]ww", -7, tp.file.title, "[W]ww") %>]] | [[<% tp.date.now("YYYY/[W]ww", 7, tp.file.title, "[W]ww") %>]] →

## Days 
---
<%*
const weekNum = parseInt(tp.file.title.replace("W", ""));
const year = tp.date.now("YYYY");
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
for (let i = 0; i < 7; i++) {
    const day = tp.date.weekday("YYYY-MM-DD", i, `${year}-W${String(weekNum).padStart(2, "0")}`, "gggg-[W]ww");
    tR += `- [[${day}]] (${days[i]})\n`;
}
%>
## Weekly Goals
---
- [ ] 

## Review
---
- 