import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

interface TextAreaProps {
  loading?: undefined | boolean;
  placeholder?: string;
  value?: string;
  onChange: (e: string) => void;
  type: SectionType.From | SectionType.To;
}
const commonStyle = {
  border: 0,
  height: "200px",
};
const getPlaceHolder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) {
    return "write anything";
  }
  if (type === SectionType.To) {
    return loading ? "loading..." : "translated";
  }
};
export const TextArea = ({ type, loading, value, onChange }: TextAreaProps) => {
 
    const styles =
    type === SectionType.From
      ? commonStyle
      : { ...commonStyle, outline: "none", backgroundColor: "#f5f5f5" };
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
      };
  return (
    <Form.Control
      value={value}
      as="textarea"
      autoFocus={type === SectionType.From ? true : false}
      placeholder={getPlaceHolder({ type, loading })}
      style={styles}
      onChange={handleChange}
    ></Form.Control>
  );
};
