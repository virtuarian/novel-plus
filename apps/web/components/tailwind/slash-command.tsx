//apps/web/components/tailwind/slash-command.tsx
import { useCallback } from 'react';
import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  X,
  Youtube,
} from "lucide-react";
import { Command, createSuggestionItems, renderItems } from "novel";
import { uploadFn } from "./image-upload";
import { getLabels } from "@/lib/labels";

export const createSuggestionItemsWithLanguage = (language: string = 'en') => {
  const labels = getLabels(language).slashCommand;

  return createSuggestionItems([
    // {
    //   title: labels.feedback.title,
    //   description: labels.feedback.description,
    //   icon: <MessageSquarePlus size={18} />,
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).run();
    //     window.open("/feedback", "_blank");
    //   },
    // },
    {
      title: labels.text.title,
      description: labels.text.description,
      searchTerms: ["p", "paragraph"],
      icon: <Text size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
      },
    },
    {
      title: labels.todo.title,
      description: labels.todo.description,
      searchTerms: ["todo", "task", "list", "check", "checkbox"],
      icon: <CheckSquare size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: labels.heading1.title,
      description: labels.heading1.description,
      searchTerms: ["title", "big", "large"],
      icon: <Heading1 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
      },
    },
    {
      title: labels.heading2.title,
      description: labels.heading2.description,
      searchTerms: ["subtitle", "medium"],
      icon: <Heading2 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
      },
    },
    {
      title: labels.heading3.title,
      description: labels.heading3.description,
      searchTerms: ["subtitle", "small"],
      icon: <Heading3 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
      },
    },
    {
      title: labels.bulletList.title,
      description: labels.bulletList.description,
      searchTerms: ["unordered", "point"],
      icon: <List size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: labels.numberedList.title,
      description: labels.numberedList.description,
      searchTerms: ["ordered"],
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: labels.quote.title,
      description: labels.quote.description,
      searchTerms: ["blockquote"],
      icon: <TextQuote size={18} />,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").toggleBlockquote().run(),
    },
    {
      title: labels.code.title,
      description: labels.code.description,
      searchTerms: ["codeblock"],
      icon: <Code size={18} />,
      command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: labels.image.title,
      description: labels.image.description,
      searchTerms: ["photo", "picture", "media"],
      icon: <ImageIcon size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        // upload image
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          if (input.files?.length) {
            const file = input.files[0];
            const pos = editor.view.state.selection.from;
            uploadFn(file, editor.view, pos);
          }
        };
        input.click();
      },
    },
    {
      title: labels.youtube.title,
      description: labels.youtube.description,
      searchTerms: ["video", "youtube", "embed"],
      icon: <Youtube size={18} />,
      command: ({ editor, range }) => {
        const videoLink = prompt("Please enter Youtube Video Link");
        //From https://regexr.com/3dj5t
        const ytregex = new RegExp(
          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
        );

        if (ytregex.test(videoLink)) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setYoutubeVideo({
              src: videoLink,
            })
            .run();
        } else {
          if (videoLink !== null) {
            alert("Please enter a correct Youtube Video Link");
          }
        }
      },
    },
    {
      title: labels.twitter.title,
      description: labels.twitter.description,
      searchTerms: ["twitter", "embed"],
      icon: <X size={18} />,
      command: ({ editor, range }) => {
        const tweetLink = prompt("Please enter Twitter Link");
        const tweetRegex = new RegExp(/^https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})(\/status\/(\d+))?(\/\S*)?$/);

        if (tweetRegex.test(tweetLink)) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setTweet({
              src: tweetLink,
            })
            .run();
        } else {
          if (tweetLink !== null) {
            alert("Please enter a correct Twitter Link");
          }
        }
      },
    },
  ]);
}
export const useSlashCommand = () => {
  const items = useCallback(() => createSuggestionItemsWithLanguage(
    process.env.NEXT_PUBLIC_AI_LANGUAGE
  ), [process.env.NEXT_PUBLIC_AI_LANGUAGE]);

  return Command.configure({
    suggestion: {
      items,
      render: renderItems,
    },
  });
};