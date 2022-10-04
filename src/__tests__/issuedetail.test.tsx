import renderer from "react-test-renderer";
import { Issue} from "../Resources/ResponseTypes";
import IssueDetailCard from "../Components/DetailCards/IssueDetailCard";




 describe('Issue component', () => {
    it('it works', async () => {
      let issue: Issue = ({
          id: 78173,
          title: "Fix bugs usercard"
      });
 
       
     const tree : any = renderer.create(<IssueDetailCard focusIssue={issue} />);
     
      
     expect(tree.toJSON()).toMatchSnapshot()
     
  });
 });
 
 