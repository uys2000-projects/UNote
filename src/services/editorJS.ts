import { type OutputData, type SanitizerConfig } from "@editorjs/editorjs";

export type NestedListItem = {
  content: string;
  items: Array<NestedListItem>;
};

export type HTMLConverter = (arg: OutputData) => string;
export const convertHTML: HTMLConverter = function (arg) {
  let result = [] as string[];
  arg.blocks.forEach((block, i) => {
    if (block.type === "paragraph")
      result[i] = convertParagraph(block.id as string, block.data);
    else if (block.type === "header")
      result[i] = convertHeader(block.id as string, block.data);
    else if (block.type === "list")
      result[i] = convertList(block.id as string, block.data);
    else if (block.type === "table")
      result[i] = convertTable(block.id as string, block.data);
    else if (block.type === "checklist")
      result[i] = convertCheckList(block.id as string, block.data);
  });
  return result.join("");
};

export type ParagraphConverter = (id: string, arg: { text: string }) => string;
export const convertParagraph: ParagraphConverter = function (id, arg) {
  return `<p id="${id}">${arg.text}</p>`;
};

export type HeaderConverter = (
  id: string,
  arg: { text: string; level: number }
) => string;
export const convertHeader: HeaderConverter = function (id, arg) {
  return `<h${arg.level} id="${id}">${arg.text}</h${arg.level}>`;
};

export type ListStyle = "ordered" | "unordered";
export type ListConverter = (
  id: string,
  arg: {
    style: ListStyle;
    items: Array<NestedListItem>;
  }
) => string;
export const convertList: ListConverter = function (id, arg) {
  const tag = arg.style == "unordered" ? "ul" : "ol";
  let result = "";

  result += `<${tag} id="${id}">`;
  arg.items.forEach((item) => {
    result += convertListNested(item, tag);
  });
  result += `</${tag}>`;
  return result;
};

export const convertListNested = function (arg: NestedListItem, tag: string) {
  let result = "";
  result += `<li>${arg.content}</li>`;
  if (arg.items.length > 0) {
    result += `<${tag}>`;
    arg.items.forEach((item) => {
      result += convertListNested(item, tag);
    });
    result += `</${tag}>`;
  }
  return result;
};

export type TableConverter = (
  id: string,
  arg: {
    withHeadings: boolean;
    content: string[][];
  }
) => string;
export const convertTable: TableConverter = function (id: string, arg) {
  let result = "";
  result += `<table id="${id}">`;
  if (arg.withHeadings)
    result += convertTableHeader(arg.content.shift() as string[]);
  result += convertTableBody(arg.content);
  result += "</table>";
  return result;
};

export const convertTableHeader = function (arg: string[]) {
  let result = "";
  result += "<thead><tr>";
  arg.forEach((col) => {
    result += `<th>${col}</th>`;
  });
  result += "</tr></thead>";
  return result;
};

export const convertTableBody = function (arg: string[][]) {
  let result = "";
  result += "<tbody>";
  arg.forEach((row) => {
    result += "<tr>";
    row.forEach((col) => {
      result += `<td>${col}</td>`;
    });
    result += "</tr>";
  });
  result += "</tbody>";
  return result;
};

export type CheckListConverter = (
  id: string,
  arg: {
    items: Array<{ text: string; checked: boolean }>;
  }
) => string;
export const convertCheckList: CheckListConverter = function (id, arg) {
  let result = `<div id="${id}" class="checklist">`;
  arg.items.forEach((item) => {
    result += `
    <label class="label cursor-pointer">
      <input type="checkbox"${
        item.checked ? "checked" : ""
      } class="checkbox checkbox-primary" />
      <span class="label-text">${item.text}</span> 
    </label>
  `;
  });
  result += "</div>";
  return result;
};
